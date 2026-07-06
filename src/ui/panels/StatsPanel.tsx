import { useState } from 'react';
import type { ReadonlyWorldSnapshot } from '../../simulation';

export const StatsPanel = ({ snapshot }: Readonly<{ snapshot: ReadonlyWorldSnapshot }>) => {
  const [isExpanded, setExpanded] = useState(true);

  return (
    <section className="w-72 rounded-lg border border-slate-700/80 bg-slate-950/90 text-sm shadow-lg shadow-black/30 backdrop-blur">
      <button className="flex w-full items-center justify-between px-3 py-2 text-left" onClick={() => setExpanded((value) => !value)}>
        <span className="text-xs font-semibold uppercase tracking-widest text-cyan-300">Panel de sistema</span>
        <span className="text-xs text-slate-400">{isExpanded ? 'Minimizar' : 'Expandir'}</span>
      </button>
      {isExpanded && (
        <div className="border-t border-slate-800 p-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Metric label="Tick" value={snapshot.tick} />
            <Metric label="Tiempo" value={snapshot.simulatedTime.toFixed(0)} />
            <Metric label="Hormigas" value={snapshot.stats.antCount} />
            <Metric label="Fuentes" value={snapshot.stats.foodSources} />
            <Metric label="Comida total" value={snapshot.stats.totalFoodAmount} />
            <Metric label="Reserva nido" value={snapshot.stats.nestStoredFood} />
          </div>
          <p className="mt-3 rounded border border-slate-800 bg-slate-900/70 p-2 text-xs leading-relaxed text-slate-400">v0.1: población fija. Reproducción y mortalidad están pendientes.</p>
        </div>
      )}
    </section>
  );
};

const Metric = ({ label, value }: Readonly<{ label: string; value: string | number }>) => (
  <div className="rounded bg-slate-900 p-2">
    <div className="text-slate-500">{label}</div>
    <div className="font-semibold text-slate-100">{value}</div>
  </div>
);
