import { Component, Suspense, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Clone, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import type { ReadonlyWorldSnapshot, Vector2 } from '../simulation';
import { useUiStore } from '../state/uiStore';
import type { ActiveTool } from '../state/uiStore';

type SceneRootProps = Readonly<{
  snapshot: ReadonlyWorldSnapshot;
  resetCameraSignal: number;
  activeTool: ActiveTool;
  onPlaceFoodRequested: (position: Vector2) => void;
}>;

type AntSnapshot = ReadonlyWorldSnapshot['ants'][number];

type CameraControlsHandle = {
  object: {
    position: {
      set: (x: number, y: number, z: number) => void;
    };
  };
  target: {
    set: (x: number, y: number, z: number) => void;
  };
  update: () => void;
};

const initialCameraPosition: [number, number, number] = [0, 58, 66];
const cameraTarget: [number, number, number] = [0, 0, 0];

type AntModelBoundaryProps = Readonly<{
  children: ReactNode;
  fallback: ReactNode;
}>;

type AntModelBoundaryState = Readonly<{
  hasError: boolean;
}>;

class AntModelBoundary extends Component<AntModelBoundaryProps, AntModelBoundaryState> {
  state: AntModelBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AntModelBoundaryState {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

const antModelPath = '/models/ant.glb';
const antVisualHeight = 0.025;
const antModelScale = 0.02;
const antCarryingFoodModelScale = 0.024;
const antFallbackRadius = 0.07;
const antCarryingFoodFallbackRadius = 0.085;
const selectedAntRingInnerRadius = 0.12;
const selectedAntRingOuterRadius = 0.16;

const antRotationY = (ant: AntSnapshot): number => Math.atan2(ant.direction.x, ant.direction.z);

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
      <AntModelBoundary fallback={fallback}>
        <Suspense fallback={fallback}>
          <AntGlbModel scale={modelScale} />
        </Suspense>
      </AntModelBoundary>
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
  const selectEntity = useUiStore((state) => state.selectEntity);
  const selectedEntityId = useUiStore((state) => state.selectedEntityId);
  const width = snapshot.bounds.maxX - snapshot.bounds.minX;
  const depth = snapshot.bounds.maxZ - snapshot.bounds.minZ;

  useEffect(() => {
    const controls = controlsRef.current as CameraControlsHandle | null;
    if (!controls) {
      return;
    }
    controls.object.position.set(...initialCameraPosition);
    controls.target.set(...cameraTarget);
    controls.update();
  }, [resetCameraSignal]);

  const handleTerrainClick = (event: ThreeEvent<MouseEvent>) => {
    if (activeTool !== 'place-food') {
      return;
    }
    event.stopPropagation();
    onPlaceFoodRequested({ x: event.point.x, z: event.point.z });
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
        maxDistance={140}
        maxPolarAngle={Math.PI / 2.15}
        minDistance={2.2}
        minPolarAngle={0.25}
        target={cameraTarget}
      />
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} onClick={handleTerrainClick}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <gridHelper args={[width, 24, '#334155', '#1e293b']} position={[0, 0.01, 0]} />
      {snapshot.nests.map((nest) => (
        <mesh key={nest.id} position={[nest.position.x, 0.35, nest.position.z]} onClick={(event) => stopEntityClick(event, () => selectEntity(nest.id))}>
          <cylinderGeometry args={[1.25, 1.6, 0.7, 24]} />
          <meshStandardMaterial color={selectedEntityId === nest.id ? '#fbbf24' : '#92400e'} />
        </mesh>
      ))}
      {snapshot.foods.map((food) => (
        <mesh key={food.id} position={[food.position.x, 0.35, food.position.z]} onClick={(event) => stopEntityClick(event, () => selectEntity(food.id))}>
          <boxGeometry args={[0.9, 0.7, 0.9]} />
          <meshStandardMaterial color={selectedEntityId === food.id ? '#a7f3d0' : '#22c55e'} opacity={food.amount > 0 ? 1 : 0.25} transparent />
        </mesh>
      ))}
      {snapshot.ants.map((ant) => (
        <group key={ant.id} onClick={(event) => stopEntityClick(event, () => selectEntity(ant.id))}>
          <AntVisual ant={ant} selectedEntityId={selectedEntityId} />
        </group>
      ))}
    </group>
  );
};
