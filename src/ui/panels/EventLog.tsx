import { useState } from 'react';
import type { ReadonlyWorldSnapshot } from '../../simulation';

type LogMode = 'compacto' | 'normal' | 'expandido';

const modeConfig: Record<LogMode, { height: string; listHeight: string; limit: number; label: string }> = {
  compacto: { height: 'h-16', listHeight: 'max-h-6', limit: 1, label: 'Compacto' },
  normal: { height: 'h-36', listHeight: 'max-h-24', limit: 8, label: 'Normal' },
  expandido: { height: 'h-[24rem]', listHeight: 'max-h-[19rem]', limit: 80, label: 'Expandido' }
};

const modes: LogMode[] = ['compacto', 'normal', 'expandido'];

export const EventLog = ({ snapshot }: Readonly<{ snapshot: ReadonlyWorldSnapshot }>) => {
  const [mode, setMode] = useState<LogMode>('normal');
  const config = modeConfig[mode];
  const visibleEvents = [...snapshot.events].reverse().slice(0, config.limit);

  return (
    <footer className={`${config.height} shrink-0 border-t border-slate-800 bg-slate-950/95 p-3 transition-[height]`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-300">Registro de eventos</h2>
          <p className="text-[11px] text-slate-500">Eventos de simulación e intervenciones experimentales</p>
        </div>
        <div className="flex overflow-hidden rounded border border-slate-700" aria-label="Modo del registro de eventos">
          {modes.map((candidate) => (
            <button
              className={`px-2 py-1 text-xs ${mode === candidate ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
              key={candidate}
              onClick={() => setMode(candidate)}
            >
              {modeConfig[candidate].label}
            </button>
          ))}
        </div>
      </div>
      <div className={`${config.listHeight} mt-2 grid grid-cols-1 content-start gap-1 overflow-auto pr-1 text-xs text-slate-300`}>
        {visibleEvents.map((event, index) => (
          <div className="rounded border border-slate-800 bg-slate-900 px-2 py-1 leading-relaxed" key={`${event.tick}-${event.type}-${event.entityId ?? 'world'}-${index}`}>
            <span className="text-cyan-300">T{event.tick}</span> · {event.message}
          </div>
        ))}
      </div>
    </footer>
  );
};
