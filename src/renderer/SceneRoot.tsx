import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Clone, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { CanvasTexture, MOUSE, RepeatWrapping } from 'three';
import type { ThreeEvent } from '@react-three/fiber';
import type { ReadonlyWorldSnapshot, Vector2 } from '../simulation';
import { useUiStore } from '../state/uiStore';
import type { ActiveTool, TerrainVisualPreset } from '../state/uiStore';

type SceneRootProps = Readonly<{
  snapshot: ReadonlyWorldSnapshot;
  resetCameraSignal: number;
  activeTool: ActiveTool;
  onPlaceFoodRequested: (position: Vector2) => void;
}>;

type AntSnapshot = ReadonlyWorldSnapshot['ants'][number];
type FoodSnapshot = ReadonlyWorldSnapshot['foods'][number];

type CameraControlsHandle = {
  object: {
    position: {
      x: number;
      y: number;
      z: number;
      set: (x: number, y: number, z: number) => void;
    };
  };
  target: {
    set: (x: number, y: number, z: number) => void;
  };
  update: () => void;
};

const initialCameraPosition: [number, number, number] = [0, 80, 92];
const cameraTarget: [number, number, number] = [0, 0, 0];
const orbitMouseButtons = { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.PAN, RIGHT: MOUSE.PAN } as const;
const foodPreviewHeight = 0.35;
const pointerDragThreshold = 4;

const groundTextureSize = 256;

type TerrainVisualPresetConfig = Readonly<{
  baseColor: string;
  patchPalette: readonly string[];
  patchOpacityScale: number;
  worldRepeat: number;
  gridMainColor: string;
  gridSubtleColor: string;
}>;

const terrainVisualPresets: Record<TerrainVisualPreset, TerrainVisualPresetConfig> = {
  'lab-clear': {
    baseColor: '#c8c8a0',
    patchPalette: ['142, 126, 82', '103, 126, 70', '205, 194, 139', '162, 145, 95'],
    patchOpacityScale: 0.65,
    worldRepeat: 18,
    gridMainColor: '#d8d9bd',
    gridSubtleColor: '#b7bb91'
  },
  'dry-sand': {
    baseColor: '#d3bd85',
    patchPalette: ['171, 130, 67', '216, 197, 139', '143, 111, 62', '191, 166, 100'],
    patchOpacityScale: 0.75,
    worldRepeat: 15,
    gridMainColor: '#e4d5ab',
    gridSubtleColor: '#bda66e'
  },
  'dry-grass': {
    baseColor: '#aeb77a',
    patchPalette: ['86, 118, 62', '139, 133, 71', '190, 178, 111', '112, 96, 58'],
    patchOpacityScale: 0.7,
    worldRepeat: 17,
    gridMainColor: '#d2d8a9',
    gridSubtleColor: '#8f9d67'
  },
  'light-soil': {
    baseColor: '#b99b73',
    patchPalette: ['111, 76, 48', '158, 121, 79', '205, 177, 127', '97, 109, 61'],
    patchOpacityScale: 0.72,
    worldRepeat: 16,
    gridMainColor: '#dcc39d',
    gridSubtleColor: '#9f7b56'
  }
};

const createGroundTexture = (width: number, depth: number, preset: TerrainVisualPresetConfig, variation: number): CanvasTexture | null => {
  if (typeof document === 'undefined') {
    return null;
  }

  const canvas = document.createElement('canvas');
  canvas.width = groundTextureSize;
  canvas.height = groundTextureSize;

  const context = canvas.getContext('2d');
  if (!context) {
    return null;
  }

  context.fillStyle = preset.baseColor;
  context.fillRect(0, 0, groundTextureSize, groundTextureSize);

  for (let index = 0; index < 72; index += 1) {
    const x = (index * 47 + variation * 31 + 23) % groundTextureSize;
    const y = (index * 83 + variation * 53 + 41) % groundTextureSize;
    const radiusX = 10 + ((index * 11 + variation * 5) % 24);
    const radiusY = 6 + ((index * 7 + variation * 3) % 18);
    const rotation = ((index * 29 + variation * 17) % 180) * (Math.PI / 180);
    const opacity = (0.08 + ((index + variation) % 4) * 0.025) * preset.patchOpacityScale;

    context.beginPath();
    context.ellipse(x, y, radiusX, radiusY, rotation, 0, Math.PI * 2);
    context.fillStyle = `rgba(${preset.patchPalette[index % preset.patchPalette.length]}, ${opacity})`;
    context.fill();
  }

  const texture = new CanvasTexture(canvas);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(Math.max(1, width / preset.worldRepeat), Math.max(1, depth / preset.worldRepeat));

  return texture;
};

type ModelBoundaryProps = Readonly<{
  children: ReactNode;
  fallback: ReactNode;
}>;

type ModelBoundaryState = Readonly<{
  hasError: boolean;
}>;

class ModelBoundary extends Component<ModelBoundaryProps, ModelBoundaryState> {
  state: ModelBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ModelBoundaryState {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

const antModelPath = '/models/ant.glb';
const foodModelPath = '/models/hoja_verde.glb';
const antVisualHeight = 0.025;
const antModelScale = 0.02;
const antCarryingFoodModelScale = 0.024;
const antFallbackRadius = 0.07;
const antCarryingFoodFallbackRadius = 0.085;
const selectedAntRingInnerRadius = 0.12;
const selectedAntRingOuterRadius = 0.16;
const foodModelHeight = 0.04;
const foodModelScale = 0.45;
const foodModelRotation: [number, number, number] = [-Math.PI / 2, 0, 0];

const antRotationY = (ant: AntSnapshot): number => Math.atan2(ant.direction.x, ant.direction.z);

const FoodFallback = ({ food, selectedEntityId }: Readonly<{ food: FoodSnapshot; selectedEntityId: string | null }>) => (
  <mesh position={[0, 0.35, 0]}>
    <boxGeometry args={[0.9, 0.7, 0.9]} />
    <meshStandardMaterial color={selectedEntityId === food.id ? '#a7f3d0' : '#22c55e'} opacity={food.amount > 0 ? 1 : 0.25} transparent />
  </mesh>
);

const FoodGlbModel = () => {
  const { scene } = useGLTF(foodModelPath);

  return <Clone object={scene} position={[0, foodModelHeight, 0]} rotation={foodModelRotation} scale={foodModelScale} />;
};

const FoodVisual = ({ food, selectedEntityId }: Readonly<{ food: FoodSnapshot; selectedEntityId: string | null }>) => {
  const fallback = <FoodFallback food={food} selectedEntityId={selectedEntityId} />;

  return (
    <group position={[food.position.x, 0, food.position.z]}>
      <ModelBoundary fallback={fallback}>
        <Suspense fallback={fallback}>
          <FoodGlbModel />
        </Suspense>
      </ModelBoundary>
    </group>
  );
};

const AntFallback = ({ ant, selectedEntityId }: Readonly<{ ant: AntSnapshot; selectedEntityId: string | null }>) => (
  <mesh>
    <sphereGeometry args={[ant.carryingFood ? antCarryingFoodFallbackRadius : antFallbackRadius, 16, 16]} />
    <meshStandardMaterial color={selectedEntityId === ant.id ? '#38bdf8' : '#020617'} roughness={0.65} />
  </mesh>
);

const AntGlbModel = ({ scale }: Readonly<{ scale: number }>) => {
  const { scene } = useGLTF(antModelPath);

  return <Clone object={scene} scale={scale} />;
};

const AntVisual = ({ ant, selectedEntityId }: Readonly<{ ant: AntSnapshot; selectedEntityId: string | null }>) => {
  const fallback = <AntFallback ant={ant} selectedEntityId={selectedEntityId} />;

  const modelScale = ant.carryingFood ? antCarryingFoodModelScale : antModelScale;

  return (
    <group position={[ant.position.x, antVisualHeight, ant.position.z]} rotation={[0, antRotationY(ant), 0]}>
      <ModelBoundary fallback={fallback}>
        <Suspense fallback={fallback}>
          <AntGlbModel scale={modelScale} />
        </Suspense>
      </ModelBoundary>
      {selectedEntityId === ant.id && (
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[selectedAntRingInnerRadius, selectedAntRingOuterRadius, 24]} />
          <meshBasicMaterial color="#38bdf8" opacity={0.65} transparent />
        </mesh>
      )}
    </group>
  );
};

export const SceneRoot = ({ snapshot, resetCameraSignal, activeTool, onPlaceFoodRequested }: SceneRootProps) => (
  <Canvas camera={{ position: initialCameraPosition, fov: 45, near: 0.1, far: 500 }} shadows>
    <color args={['#020617']} attach="background" />
    <ambientLight intensity={0.55} />
    <directionalLight intensity={1.2} position={[12, 20, 8]} />
    <SimulationView snapshot={snapshot} resetCameraSignal={resetCameraSignal} activeTool={activeTool} onPlaceFoodRequested={onPlaceFoodRequested} />
  </Canvas>
);

const SimulationView = ({ snapshot, resetCameraSignal, activeTool, onPlaceFoodRequested }: SceneRootProps) => {
  const controlsRef = useRef<unknown>(null);
  const terrainPointerRef = useRef<{ button: number; startX: number; startY: number; dragged: boolean } | null>(null);
  const [foodPreviewPosition, setFoodPreviewPosition] = useState<Vector2 | null>(null);
  const [isFollowingSelectedAnt, setIsFollowingSelectedAnt] = useState(false);
  const selectEntity = useUiStore((state) => state.selectEntity);
  const selectedEntityId = useUiStore((state) => state.selectedEntityId);
  const setActiveTool = useUiStore((state) => state.setActiveTool);
  const width = snapshot.bounds.maxX - snapshot.bounds.minX;
  const depth = snapshot.bounds.maxZ - snapshot.bounds.minZ;
  const selectedAnt = snapshot.ants.find((ant) => ant.id === selectedEntityId) ?? null;
  const terrainVisualPreset = useUiStore((state) => state.terrainVisualPreset);
  const terrainVariation = useUiStore((state) => state.terrainVariation);
  const showTerrainGrid = useUiStore((state) => state.showTerrainGrid);
  const terrainVisualConfig = terrainVisualPresets[terrainVisualPreset];
  const groundTexture = useMemo(() => createGroundTexture(width, depth, terrainVisualConfig, terrainVariation), [width, depth, terrainVisualConfig, terrainVariation]);

  useEffect(() => {
    return () => groundTexture?.dispose();
  }, [groundTexture]);

  useEffect(() => {
    const controls = controlsRef.current as CameraControlsHandle | null;
    if (!controls) {
      return;
    }
    controls.object.position.set(...initialCameraPosition);
    controls.target.set(...cameraTarget);
    controls.update();
    setIsFollowingSelectedAnt(false);
  }, [resetCameraSignal]);

  useEffect(() => {
    if (activeTool !== 'place-food') {
      setFoodPreviewPosition(null);
    }
  }, [activeTool]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeTool === 'place-food') {
        setFoodPreviewPosition(null);
        setActiveTool('inspect');
        return;
      }

      if (event.key.toLowerCase() === 'f' && selectedAnt) {
        event.preventDefault();
        setIsFollowingSelectedAnt((isFollowing) => !isFollowing);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTool, selectedAnt, setActiveTool]);

  useEffect(() => {
    if (!selectedAnt) {
      setIsFollowingSelectedAnt(false);
      return;
    }

    if (!isFollowingSelectedAnt) {
      return;
    }

    const controls = controlsRef.current as CameraControlsHandle | null;
    if (!controls) {
      return;
    }

    controls.target.set(selectedAnt.position.x, 0, selectedAnt.position.z);
    controls.update();
  }, [isFollowingSelectedAnt, selectedAnt]);

  const isInsideWorldBounds = (position: Vector2) =>
    position.x >= snapshot.bounds.minX && position.x <= snapshot.bounds.maxX && position.z >= snapshot.bounds.minZ && position.z <= snapshot.bounds.maxZ;

  const handleTerrainPointerDown = (event: ThreeEvent<PointerEvent>) => {
    terrainPointerRef.current = { button: event.button, startX: event.clientX, startY: event.clientY, dragged: false };

    if (event.button === 2 && activeTool === 'place-food') {
      event.stopPropagation();
      setFoodPreviewPosition(null);
      setActiveTool('inspect');
    }
  };

  const handleTerrainPointerMove = (event: ThreeEvent<PointerEvent>) => {
    const pointerState = terrainPointerRef.current;
    if (pointerState) {
      const distanceX = event.clientX - pointerState.startX;
      const distanceY = event.clientY - pointerState.startY;
      pointerState.dragged = pointerState.dragged || Math.hypot(distanceX, distanceY) > pointerDragThreshold;
    }

    if (activeTool !== 'place-food') {
      return;
    }

    const nextPreviewPosition = { x: event.point.x, z: event.point.z };
    setFoodPreviewPosition(isInsideWorldBounds(nextPreviewPosition) ? nextPreviewPosition : null);
  };

  const handleTerrainPointerLeave = () => {
    terrainPointerRef.current = null;
    setFoodPreviewPosition(null);
  };

  const handleTerrainPointerUp = () => undefined;

  const handleTerrainClick = (event: ThreeEvent<MouseEvent>) => {
    const pointerState = terrainPointerRef.current;
    const isPrimaryClick = event.button === 0;
    const clickPosition = { x: event.point.x, z: event.point.z };

    terrainPointerRef.current = null;

    if (activeTool !== 'place-food' || !isPrimaryClick || pointerState?.dragged || !isInsideWorldBounds(clickPosition)) {
      return;
    }

    event.stopPropagation();
    onPlaceFoodRequested(clickPosition);
  };

  const stopEntityClick = (event: ThreeEvent<MouseEvent>, select: () => void) => {
    event.stopPropagation();
    select();
  };

  return (
    <group>
      <OrbitControls
        ref={(controls) => {
          controlsRef.current = controls;
        }}
        enableDamping
        enablePan
        enableZoom
        makeDefault
        mouseButtons={orbitMouseButtons}
        maxDistance={180}
        maxPolarAngle={Math.PI / 2.15}
        minDistance={2.2}
        minPolarAngle={0.25}
        target={cameraTarget}
      />
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={handleTerrainClick}
        onContextMenu={(event) => event.nativeEvent.preventDefault()}
        onPointerDown={handleTerrainPointerDown}
        onPointerLeave={handleTerrainPointerLeave}
        onPointerMove={handleTerrainPointerMove}
        onPointerUp={handleTerrainPointerUp}
      >
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#ffffff" map={groundTexture ?? undefined} roughness={0.95} />
      </mesh>
      {showTerrainGrid && <gridHelper args={[width, 24, terrainVisualConfig.gridMainColor, terrainVisualConfig.gridSubtleColor]} position={[0, 0.01, 0]} />}
      {foodPreviewPosition && (
        <mesh position={[foodPreviewPosition.x, foodPreviewHeight, foodPreviewPosition.z]}>
          <boxGeometry args={[0.9, 0.7, 0.9]} />
          <meshStandardMaterial color="#22c55e" opacity={0.35} transparent />
        </mesh>
      )}
      {snapshot.nests.map((nest) => (
        <mesh key={nest.id} position={[nest.position.x, 0.35, nest.position.z]} onClick={(event) => stopEntityClick(event, () => selectEntity(nest.id))}>
          <cylinderGeometry args={[1.25, 1.6, 0.7, 24]} />
          <meshStandardMaterial color={selectedEntityId === nest.id ? '#fbbf24' : '#92400e'} />
        </mesh>
      ))}
      {snapshot.foods.map((food) => (
        <group key={food.id} onClick={(event) => stopEntityClick(event, () => selectEntity(food.id))}>
          <FoodVisual food={food} selectedEntityId={selectedEntityId} />
        </group>
      ))}
      {snapshot.ants.map((ant) => (
        <group key={ant.id} onClick={(event) => stopEntityClick(event, () => selectEntity(ant.id))}>
          <AntVisual ant={ant} selectedEntityId={selectedEntityId} />
        </group>
      ))}
    </group>
  );
};
