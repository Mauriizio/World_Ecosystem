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
  <header className="flex min-h-20 flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-950/95 px-4 py-3 shadow-lg shadow-black/20">
    <div className="min-w-64">
      <h1 className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Laboratorio de Ecosistemas</h1>
      <p className="mt-1 text-xs text-slate-400">Sandbox experimental · simulación headless · render de solo lectura</p>
    </div>
    <div className="flex flex-wrap items-center justify-end gap-2">
      <button className="rounded bg-emerald-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-40" disabled={isPlaying} onClick={onPlay}>
        Reproducir
      </button>
      <button className="rounded bg-amber-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-40" disabled={!isPlaying} onClick={onPause}>
        Pausar
      </button>
      <div className="flex overflow-hidden rounded border border-slate-700" aria-label="Velocidad de simulación">
        {speeds.map((candidate) => (
          <button
            className={`px-3 py-2 text-sm ${speed === candidate ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
            key={candidate}
            onClick={() => onSpeedChange(candidate)}
          >
            x{candidate}
          </button>
        ))}
      </div>
      <button className="rounded bg-slate-800 px-3 py-2 text-sm text-slate-100 hover:bg-slate-700" onClick={onReset}>
        Reiniciar
      </button>
      <button className="rounded bg-cyan-700 px-3 py-2 text-sm font-semibold text-white hover:bg-cyan-600" onClick={onNewExperiment}>
        Nuevo Experimento
      </button>
    </div>
  </header>
);
