import type { ReadonlyWorldSnapshot } from '../../simulation';

type RightInspectorProps = Readonly<{
  snapshot: ReadonlyWorldSnapshot;
  selectedEntityId: string | null;
}>;

export const RightInspector = ({ snapshot, selectedEntityId }: RightInspectorProps) => {
  const selectedAnt = snapshot.ants.find((ant) => ant.id === selectedEntityId);
  const selectedFood = snapshot.foods.find((food) => food.id === selectedEntityId);
  const selectedNest = snapshot.nests.find((nest) => nest.id === selectedEntityId);

  return (
    <aside className="w-80 border-l border-slate-800 bg-slate-950/90 p-4">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-300">Inspector</h2>
      {!selectedEntityId && <p className="mt-4 text-sm text-slate-400">Selecciona una entidad para observar su estado simulado.</p>}
      {selectedAnt && (
        <dl className="mt-4 space-y-2 text-sm">
          <Row label="ID" value={selectedAnt.id} />
          <Row label="Estado" value={selectedAnt.state} />
          <Row label="Posición" value={`${selectedAnt.position.x.toFixed(2)}, ${selectedAnt.position.z.toFixed(2)}`} />
          <Row label="Energía" value={selectedAnt.energy.toFixed(2)} />
          <Row label="Hambre" value={selectedAnt.hunger.toFixed(2)} />
          <Row label="Edad" value={selectedAnt.age.toFixed(0)} />
          <Row label="Carga comida" value={selectedAnt.carryingFood ? 'Sí' : 'No'} />
        </dl>
      )}
      {selectedFood && (
        <dl className="mt-4 space-y-2 text-sm">
          <Row label="ID" value={selectedFood.id} />
          <Row label="Cantidad" value={String(selectedFood.amount)} />
          <Row label="Posición" value={`${selectedFood.position.x.toFixed(2)}, ${selectedFood.position.z.toFixed(2)}`} />
        </dl>
      )}
      {selectedNest && (
        <dl className="mt-4 space-y-2 text-sm">
          <Row label="ID" value={selectedNest.id} />
          <Row label="Colonia" value={selectedNest.colonyId} />
          <Row label="Reserva" value={String(selectedNest.storedFood)} />
        </dl>
      )}
    </aside>
  );
};

const Row = ({ label, value }: Readonly<{ label: string; value: string }>) => (
  <div className="flex justify-between gap-4 border-b border-slate-800 pb-1">
    <dt className="text-slate-500">{label}</dt>
    <dd className="text-right text-slate-100">{value}</dd>
  </div>
);
