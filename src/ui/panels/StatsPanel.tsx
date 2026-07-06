import type { ReadonlyWorldSnapshot } from '../../simulation';

export const StatsPanel = ({ snapshot }: Readonly<{ snapshot: ReadonlyWorldSnapshot }>) => (
  <section className="rounded-lg border border-slate-800 bg-slate-950/80 p-3 text-sm shadow-lg shadow-black/20">
    <h2 className="text-xs font-semibold uppercase tracking-widest text-cyan-300">Estadísticas</h2>
    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
      <Metric label="Tick" value={snapshot.tick} />
      <Metric label="Tiempo" value={snapshot.simulatedTime.toFixed(0)} />
      <Metric label="Hormigas" value={snapshot.stats.antCount} />
      <Metric label="Fuentes" value={snapshot.stats.foodSources} />
      <Metric label="Comida total" value={snapshot.stats.totalFoodAmount} />
      <Metric label="Reserva nido" value={snapshot.stats.nestStoredFood} />
    </div>
  </section>
);

const Metric = ({ label, value }: Readonly<{ label: string; value: string | number }>) => (
  <div className="rounded bg-slate-900 p-2">
    <div className="text-slate-500">{label}</div>
    <div className="font-semibold text-slate-100">{value}</div>
  </div>
);
