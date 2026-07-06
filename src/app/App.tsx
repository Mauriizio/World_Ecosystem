import { useEffect, useRef, useState } from 'react';
import { createInitialExperiment } from '../experiments/initialScenario';
import { SceneRoot } from '../renderer/SceneRoot';
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
  const isPlaying = useUiStore((state) => state.isPlaying);
  const speed = useUiStore((state) => state.speed);
  const selectedEntityId = useUiStore((state) => state.selectedEntityId);
  const selectEntity = useUiStore((state) => state.selectEntity);
  const setPlaying = useUiStore((state) => state.setPlaying);
  const setSpeed = useUiStore((state) => state.setSpeed);

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
    simulationRef.current = createInitialExperiment();
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
    <div className="flex h-screen min-w-[1100px] flex-col bg-slate-950 text-slate-100">
      <TopBar
        isPlaying={isPlaying}
        speed={speed}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onSpeedChange={changeSpeed}
        onReset={resetExperiment}
        onNewExperiment={resetExperiment}
      />
      <main className="flex min-h-0 flex-1 overflow-hidden">
        <LeftPanel snapshot={snapshot} selectedEntityId={selectedEntityId} onSelect={selectEntity} />
        <section className="relative min-w-0 flex-1 bg-slate-950">
          <SceneRoot snapshot={snapshot} />
          <div className="pointer-events-auto absolute right-4 top-4">
            <StatsPanel snapshot={snapshot} />
          </div>
        </section>
        <RightInspector snapshot={snapshot} selectedEntityId={selectedEntityId} onApplyLabIntervention={applyLabIntervention} />
      </main>
      <EventLog snapshot={snapshot} />
    </div>
  );
};
