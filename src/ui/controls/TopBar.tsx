import type { PlaybackSpeed } from '../../state/uiStore';

const speeds: PlaybackSpeed[] = [1, 5, 20, 100];

type TopBarProps = Readonly<{
  isPlaying: boolean;
  speed: PlaybackSpeed;
  onPlay: () => void;
  onPause: () => void;
  onSpeedChange: (speed: PlaybackSpeed) => void;
  onReset: () => void;
  onNewExperiment: () => void;
}>;

export const TopBar = ({
  isPlaying,
  speed,
  onPlay,
  onPause,
  onSpeedChange,
  onReset,
  onNewExperiment
}: TopBarProps) => (
  <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 shadow-lg shadow-black/20">
    <div>
      <h1 className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-200">Laboratorio de Ecosistemas</h1>
      <p className="text-xs text-slate-400">Base técnica v0.1 · simulación headless con render de solo lectura</p>
    </div>
    <div className="flex items-center gap-2">
      <button className="rounded bg-emerald-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-40" disabled={isPlaying} onClick={onPlay}>
        Play
      </button>
      <button className="rounded bg-amber-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-40" disabled={!isPlaying} onClick={onPause}>
        Pause
      </button>
      <div className="ml-2 flex overflow-hidden rounded border border-slate-700">
        {speeds.map((candidate) => (
          <button
            className={`px-3 py-2 text-sm ${speed === candidate ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-300'}`}
            key={candidate}
            onClick={() => onSpeedChange(candidate)}
          >
            x{candidate}
          </button>
        ))}
      </div>
      <button className="rounded bg-slate-800 px-3 py-2 text-sm text-slate-100" onClick={onReset}>
        Reset
      </button>
      <button className="rounded bg-cyan-700 px-3 py-2 text-sm font-semibold text-white" onClick={onNewExperiment}>
        Nuevo Experimento
      </button>
    </div>
  </header>
);
