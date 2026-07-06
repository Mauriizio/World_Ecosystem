import { useEffect, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import type { ReadonlyWorldSnapshot } from '../simulation';
import { useUiStore } from '../state/uiStore';

type SceneRootProps = Readonly<{
  snapshot: ReadonlyWorldSnapshot;
  resetCameraSignal: number;
}>;

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

export const SceneRoot = ({ snapshot, resetCameraSignal }: SceneRootProps) => (
  <Canvas camera={{ position: initialCameraPosition, fov: 45, near: 0.1, far: 500 }} shadows>
    <color args={['#020617']} attach="background" />
    <ambientLight intensity={0.55} />
    <directionalLight intensity={1.2} position={[12, 20, 8]} />
    <SimulationView snapshot={snapshot} resetCameraSignal={resetCameraSignal} />
  </Canvas>
);

const SimulationView = ({ snapshot, resetCameraSignal }: SceneRootProps) => {
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
        minDistance={6}
        minPolarAngle={0.25}
        target={cameraTarget}
      />
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <gridHelper args={[width, 24, '#334155', '#1e293b']} position={[0, 0.01, 0]} />
      {snapshot.nests.map((nest) => (
        <mesh key={nest.id} position={[nest.position.x, 0.35, nest.position.z]} onClick={() => selectEntity(nest.id)}>
          <cylinderGeometry args={[1.25, 1.6, 0.7, 24]} />
          <meshStandardMaterial color={selectedEntityId === nest.id ? '#fbbf24' : '#92400e'} />
        </mesh>
      ))}
      {snapshot.foods.map((food) => (
        <mesh key={food.id} position={[food.position.x, 0.35, food.position.z]} onClick={() => selectEntity(food.id)}>
          <boxGeometry args={[0.9, 0.7, 0.9]} />
          <meshStandardMaterial color={selectedEntityId === food.id ? '#a7f3d0' : '#22c55e'} opacity={food.amount > 0 ? 1 : 0.25} transparent />
        </mesh>
      ))}
      {snapshot.ants.map((ant) => (
        <mesh key={ant.id} position={[ant.position.x, 0.28, ant.position.z]} onClick={() => selectEntity(ant.id)}>
          <sphereGeometry args={[ant.carryingFood ? 0.36 : 0.28, 16, 16]} />
          <meshStandardMaterial color={selectedEntityId === ant.id ? '#38bdf8' : '#020617'} roughness={0.65} />
        </mesh>
      ))}
    </group>
  );
};
