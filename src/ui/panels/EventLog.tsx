import { useState } from 'react';
import type { ReadonlyWorldSnapshot } from '../../simulation';

export const EventLog = ({ snapshot }: Readonly<{ snapshot: ReadonlyWorldSnapshot }>) => {
  const [isExpanded, setExpanded] = useState(false);
  const visibleEvents = [...snapshot.events].reverse().slice(0, isExpanded ? 40 : 6);

  return (
    <footer className={`${isExpanded ? 'h-72' : 'h-32'} border-t border-slate-800 bg-slate-950/95 p-3 transition-[height]`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">Log de eventos</h2>
        <button className="rounded border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:bg-slate-800" onClick={() => setExpanded((value) => !value)}>
          {isExpanded ? 'Colapsar' : 'Expandir'}
        </button>
      </div>
      <div className={`${isExpanded ? 'max-h-56' : 'max-h-20'} mt-2 grid grid-cols-1 gap-1 overflow-auto pr-1 text-xs text-slate-300`}>
        {visibleEvents.map((event, index) => (
          <div className="rounded bg-slate-900 px-2 py-1 leading-relaxed" key={`${event.tick}-${event.type}-${event.entityId ?? 'world'}-${index}`}>
            <span className="text-cyan-300">T{event.tick}</span> · {event.message}
          </div>
        ))}
      </div>
    </footer>
  );
};
