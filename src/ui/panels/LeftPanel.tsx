import type { ReadonlyWorldSnapshot } from '../../simulation';
import { antStateLabels } from '../presentation/labels';

type LeftPanelProps = Readonly<{
  snapshot: ReadonlyWorldSnapshot;
  selectedEntityId: string | null;
  onSelect: (id: string | null) => void;
}>;

const futureTools = ['Colocar comida', 'Cambiar humedad', 'Provocar lluvia', 'Agregar obstáculo', 'Introducir organismo'];

export const LeftPanel = ({ snapshot, selectedEntityId, onSelect }: LeftPanelProps) => (
  <aside className="w-80 shrink-0 overflow-hidden border-r border-slate-800 bg-slate-950/90 p-4">
    <div className="flex h-full min-h-0 flex-col gap-4">
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-300">Herramientas de laboratorio</h2>
        <div className="mt-3 space-y-2">
          <button className="w-full rounded border border-cyan-700 bg-cyan-950 px-3 py-2 text-left text-sm text-cyan-100" onClick={() => onSelect(null)}>
            Inspección ambiental
          </button>
          <div className="rounded border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-300">Inspector de entidad</div>
          <div className="rounded border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-300">Overrides experimentales desde inspector</div>
        </div>
      </section>

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Herramientas futuras</h3>
        <div className="mt-2 grid gap-1">
          {futureTools.map((tool) => (
            <button className="cursor-not-allowed rounded border border-slate-800 bg-slate-900/40 px-3 py-2 text-left text-xs text-slate-500" disabled key={tool}>
              {tool} · pendiente v0.2+
            </button>
          ))}
        </div>
      </section>

      <section className="min-h-0 flex-1">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-cyan-300">Hormigas</h3>
        <div className="mt-2 max-h-64 space-y-1 overflow-auto pr-1">
          {snapshot.ants.map((ant) => (
            <button
              className={`w-full rounded px-2 py-1.5 text-left text-xs ${selectedEntityId === ant.id ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
              key={ant.id}
              onClick={() => onSelect(ant.id)}
            >
              <span className="font-semibold">{ant.id}</span> · {antStateLabels[ant.state]}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-emerald-300">Recursos y nido</h3>
        <div className="mt-2 space-y-1">
          {snapshot.nests.map((nest) => (
            <button className="w-full rounded bg-slate-900 px-2 py-1.5 text-left text-xs text-slate-300 hover:bg-slate-800" key={nest.id} onClick={() => onSelect(nest.id)}>
              {nest.id} · reserva {nest.storedFood}
            </button>
          ))}
          {snapshot.foods.map((food) => (
            <button className="w-full rounded bg-slate-900 px-2 py-1.5 text-left text-xs text-slate-300 hover:bg-slate-800" key={food.id} onClick={() => onSelect(food.id)}>
              {food.id} · cantidad {food.amount}
            </button>
          ))}
        </div>
      </section>
    </div>
  </aside>
);
