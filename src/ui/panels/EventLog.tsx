import type { ReadonlyWorldSnapshot } from '../../simulation';

export const EventLog = ({ snapshot }: Readonly<{ snapshot: ReadonlyWorldSnapshot }>) => (
  <footer className="h-32 border-t border-slate-800 bg-slate-950/95 p-3">
    <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">Log de eventos</h2>
    <div className="mt-2 grid max-h-20 grid-cols-1 gap-1 overflow-auto text-xs text-slate-300">
      {[...snapshot.events].reverse().slice(0, 8).map((event, index) => (
        <div className="rounded bg-slate-900 px-2 py-1" key={`${event.tick}-${event.type}-${event.entityId ?? 'world'}-${index}`}>
          <span className="text-cyan-300">T{event.tick}</span> · {event.message}
        </div>
      ))}
    </div>
  </footer>
);
