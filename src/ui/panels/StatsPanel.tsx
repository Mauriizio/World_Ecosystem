import { useState } from 'react';
import type { ReadonlyWorldSnapshot } from '../../simulation';

export const StatsPanel = ({ snapshot }: Readonly<{ snapshot: ReadonlyWorldSnapshot }>) => {
  const [isExpanded, setExpanded] = useState(true);

  return (
    <section className={`${isExpanded ? 'w-80' : 'w-52'} overflow-hidden rounded-xl border border-cyan-900/60 bg-slate-950/95 text-sm shadow-2xl shadow-black/40 backdrop-blur transition-[width]`}>
      <button className="flex w-full items-center justify-between gap-3 border-b border-slate-800 px-3 py-2 text-left" onClick={() => setExpanded((value) => !value)}>
        <span>
          <span className="block text-xs font-semibold uppercase tracking-widest text-cyan-300">Panel de sistema</span>
          {isExpanded && <span className="text-[11px] text-slate-500">Lectura técnica del experimento</span>}
        </span>
        <span className="rounded border border-slate-700 px-2 py-1 text-[11px] text-slate-300">{isExpanded ? 'Minimizar' : 'Expandir'}</span>
      </button>
      {isExpanded && (
        <div className="p-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Metric label="Tick" value={snapshot.tick} />
            <Metric label="Tiempo" value={snapshot.simulatedTime.toFixed(0)} />
            <Metric label="Hormigas" value={snapshot.stats.antCount} />
            <Metric label="Fuentes" value={snapshot.stats.foodSources} />
            <Metric label="Comida total" value={snapshot.stats.totalFoodAmount} />
            <Metric label="Reserva nido" value={snapshot.stats.nestStoredFood} />
          </div>
          <p className="mt-3 rounded border border-slate-800 bg-slate-900/80 p-2 text-xs leading-relaxed text-slate-400">v0.1: población fija. Reproducción y mortalidad están pendientes.</p>
        </div>
      )}
    </section>
  );
};

const Metric = ({ label, value }: Readonly<{ label: string; value: string | number }>) => (
  <div className="rounded border border-slate-800 bg-slate-900/90 p-2">
    <div className="text-slate-500">{label}</div>
    <div className="font-semibold text-slate-100">{value}</div>
  </div>
);
