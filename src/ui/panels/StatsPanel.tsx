import { useState } from 'react';
import type { InterventionHistoryEntry, ReadonlyWorldSnapshot } from '../../simulation';
import { downloadExperimentExport } from '../export/exportExperiment';

export const StatsPanel = ({ snapshot }: Readonly<{ snapshot: ReadonlyWorldSnapshot }>) => {
  const [isExpanded, setExpanded] = useState(true);
  const recentInterventions = [...snapshot.interventionHistory.slice(-5)].reverse();

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
          <div className="mb-3 rounded border border-cyan-950/80 bg-slate-900/80 p-2 text-xs">
            <div className="text-slate-500">Experimento</div>
            <div className="truncate font-semibold text-slate-100">{snapshot.experiment.experimentId}</div>
            <div className="mt-1 grid grid-cols-2 gap-2 text-slate-400">
              <span>Seed {snapshot.experiment.seed}</span>
              <span>{snapshot.experiment.mode === 'sandbox' ? 'Sandbox experimental' : 'Natural'}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Metric label="Tick" value={snapshot.experiment.currentTick} />
            <Metric label="Tiempo" value={snapshot.simulatedTime.toFixed(0)} />
            <Metric label="Hormigas" value={snapshot.stats.antCount} />
            <Metric label="Fuentes" value={snapshot.stats.foodSources} />
            <Metric label="Comida total" value={snapshot.stats.totalFoodAmount} />
            <Metric label="Reserva nido" value={snapshot.stats.nestStoredFood} />
            <Metric label="Intervenciones" value={snapshot.experiment.interventionCount} />
          </div>
          <section className="mt-3 rounded border border-slate-800 bg-slate-900/80 p-2 text-xs">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="font-semibold uppercase tracking-widest text-cyan-300">Historial de intervenciones</h3>
                <p className="text-slate-500">Últimas intervenciones aplicadas</p>
              </div>
              <span className="rounded border border-slate-700 px-2 py-1 text-slate-300">{snapshot.experiment.interventionCount}</span>
            </div>
            <div className="mt-2 space-y-2">
              {recentInterventions.length > 0 ? (
                recentInterventions.map((intervention) => <InterventionSummary intervention={intervention} key={intervention.id} />)
              ) : (
                <p className="rounded border border-slate-800 bg-slate-950/70 p-2 text-slate-500">Sin intervenciones registradas todavía.</p>
              )}
            </div>
          </section>
          <button
            className="mt-3 w-full rounded-lg border border-cyan-800/70 bg-cyan-950/50 px-3 py-2 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-900/70"
            onClick={() => downloadExperimentExport(snapshot)}
            type="button"
          >
            Exportar experimento
          </button>
          <p className="mt-3 rounded border border-slate-800 bg-slate-900/80 p-2 text-xs leading-relaxed text-slate-400">v0.1: población fija. Reproducción y mortalidad están pendientes. Replay y guardado pendientes.</p>
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

const interventionTypeLabel = (type: InterventionHistoryEntry['type']): string => {
  if (type === 'place-food') {
    return 'Colocar comida';
  }

  return 'Override experimental';
};

const InterventionSummary = ({ intervention }: Readonly<{ intervention: InterventionHistoryEntry }>) => (
  <article className="rounded border border-slate-800 bg-slate-950/70 p-2">
    <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500">
      <span>{interventionTypeLabel(intervention.type)}</span>
      <span>T{intervention.appliedTick}</span>
    </div>
    <p className="mt-1 leading-relaxed text-slate-300">{intervention.message}</p>
  </article>
);
