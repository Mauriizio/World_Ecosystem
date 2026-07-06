import { useEffect, useRef, useState } from 'react';
import { createInitialExperiment } from '../experiments/initialScenario';
import { SceneRoot } from '../renderer/SceneRoot';
import { createSimulation } from '../simulation';
import type { LabIntervention, ReadonlyWorldSnapshot, SimulationRuntime } from '../simulation';
import { useUiStore } from '../state/uiStore';
import type { PlaybackSpeed } from '../state/uiStore';
import { TopBar } from '../ui/controls/TopBar';
import { EventLog } from '../ui/panels/EventLog';
import { LeftPanel } from '../ui/panels/LeftPanel';
import { RightInspector } from '../ui/panels/RightInspector';
import { StatsPanel } from '../ui/panels/StatsPanel';

export const App = () => {
  const simulationRef = useRef<SimulationRuntime>(createInitialExperiment());
  const [snapshot, setSnapshot] = useState<ReadonlyWorldSnapshot>(() => simulationRef.current.snapshot());
  const [cameraResetSignal, setCameraResetSignal] = useState(0);
  const isPlaying = useUiStore((state) => state.isPlaying);
  const speed = useUiStore((state) => state.speed);
  const selectedEntityId = useUiStore((state) => state.selectedEntityId);
  const activeTool = useUiStore((state) => state.activeTool);
  const selectEntity = useUiStore((state) => state.selectEntity);
  const setPlaying = useUiStore((state) => state.setPlaying);
  const setSpeed = useUiStore((state) => state.setSpeed);
  const setActiveTool = useUiStore((state) => state.setActiveTool);

  useEffect(() => {
    if (!isPlaying) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      let nextSnapshot = simulationRef.current.snapshot();
      for (let index = 0; index < speed; index += 1) {
        nextSnapshot = simulationRef.current.tick();
      }
      setSnapshot(nextSnapshot);
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [isPlaying, speed]);

  const resetExperiment = () => {
    const { seed, antCount, experimentId, experimentName } = simulationRef.current.config;
    simulationRef.current = createSimulation({
      seed,
      antCount,
      experimentId,
      experimentName,
      initialEventMessage: `Experimento reiniciado con la misma seed ${seed}.`
    });
    setSnapshot(simulationRef.current.snapshot());
    selectEntity(null);
    setPlaying(false);
  };

  const newExperiment = () => {
    const nextSeed = simulationRef.current.config.seed + 1;
    simulationRef.current = createSimulation({
      seed: nextSeed,
      antCount: simulationRef.current.config.antCount,
      experimentId: `experiment-${nextSeed}`,
      experimentName: 'Experimento sandbox inicial',
      initialEventMessage: `Nuevo experimento creado con seed ${nextSeed}.`
    });
    setSnapshot(simulationRef.current.snapshot());
    selectEntity(null);
    setPlaying(false);
  };

  const applyLabIntervention = (intervention: LabIntervention) => {
    const result = simulationRef.current.applyLabIntervention(intervention);
    setSnapshot(result.snapshot);
  };

  const changeSpeed = (nextSpeed: PlaybackSpeed) => {
    setSpeed(nextSpeed);
  };

  return (
    <div className="flex h-screen min-w-[1180px] flex-col overflow-hidden bg-slate-950 text-slate-100">
      <TopBar
        isPlaying={isPlaying}
        speed={speed}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onSpeedChange={changeSpeed}
        onReset={resetExperiment}
        onNewExperiment={newExperiment}
      />
      <main className="grid min-h-0 flex-1 grid-cols-[20rem_minmax(0,1fr)_24rem] overflow-hidden">
        <LeftPanel snapshot={snapshot} selectedEntityId={selectedEntityId} activeTool={activeTool} onSelect={selectEntity} onToolSelect={setActiveTool} />
        <section className="relative min-w-0 overflow-hidden bg-slate-950">
          <SceneRoot
            snapshot={snapshot}
            resetCameraSignal={cameraResetSignal}
            activeTool={activeTool}
            onPlaceFoodRequested={(position) => {
              const result = simulationRef.current.applyLabIntervention({ type: 'place-food', position, amount: 10 });
              setSnapshot(result.snapshot);
            }}
          />
          <div className="pointer-events-auto absolute left-5 top-5">
            <button
              className="rounded-lg border border-slate-700 bg-slate-950/90 px-3 py-2 text-xs font-semibold text-slate-200 shadow-lg shadow-black/30 backdrop-blur hover:bg-slate-900"
              onClick={() => setCameraResetSignal((value) => value + 1)}
              type="button"
            >
              Restablecer cámara
            </button>
          </div>
          <div className="pointer-events-auto absolute right-5 top-5">
            <StatsPanel snapshot={snapshot} />
          </div>
        </section>
        <RightInspector snapshot={snapshot} selectedEntityId={selectedEntityId} onApplyLabIntervention={applyLabIntervention} />
      </main>
      <EventLog snapshot={snapshot} />
    </div>
  );
};
