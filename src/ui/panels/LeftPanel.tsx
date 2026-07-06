import type { ReadonlyWorldSnapshot } from '../../simulation';

type LeftPanelProps = Readonly<{
  snapshot: ReadonlyWorldSnapshot;
  selectedEntityId: string | null;
  onSelect: (id: string | null) => void;
}>;

export const LeftPanel = ({ snapshot, selectedEntityId, onSelect }: LeftPanelProps) => (
  <aside className="w-72 border-r border-slate-800 bg-slate-950/90 p-4">
    <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-300">Entidades</h2>
    <div className="mt-4 space-y-4">
      <section>
        <h3 className="text-xs font-semibold uppercase text-cyan-300">Herramientas</h3>
        <button className="mt-2 w-full rounded border border-cyan-700 bg-cyan-950 px-3 py-2 text-left text-sm text-cyan-100" onClick={() => onSelect(null)}>
          Inspección ambiental
        </button>
      </section>
      <section>
        <h3 className="text-xs font-semibold uppercase text-slate-400">Hormigas</h3>
        <div className="mt-2 max-h-56 space-y-1 overflow-auto pr-1">
          {snapshot.ants.map((ant) => (
            <button
              className={`w-full rounded px-2 py-1 text-left text-xs ${selectedEntityId === ant.id ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
              key={ant.id}
              onClick={() => onSelect(ant.id)}
            >
              {ant.id} · {ant.state}
            </button>
          ))}
        </div>
      </section>
      <section>
        <h3 className="text-xs font-semibold uppercase text-slate-400">Recursos y nido</h3>
        <div className="mt-2 space-y-1">
          {snapshot.nests.map((nest) => (
            <button className="w-full rounded bg-slate-900 px-2 py-1 text-left text-xs text-slate-300" key={nest.id} onClick={() => onSelect(nest.id)}>
              {nest.id} · reserva {nest.storedFood}
            </button>
          ))}
          {snapshot.foods.map((food) => (
            <button className="w-full rounded bg-slate-900 px-2 py-1 text-left text-xs text-slate-300" key={food.id} onClick={() => onSelect(food.id)}>
              {food.id} · cantidad {food.amount}
            </button>
          ))}
        </div>
      </section>
    </div>
  </aside>
);
