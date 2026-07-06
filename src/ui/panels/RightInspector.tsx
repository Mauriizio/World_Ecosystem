import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { AntScalarOverrideField, LabIntervention, ReadonlyWorldSnapshot } from '../../simulation';
import { antStateLabels, booleanFoodLabels } from '../presentation/labels';

type RightInspectorProps = Readonly<{
  snapshot: ReadonlyWorldSnapshot;
  selectedEntityId: string | null;
  onApplyLabIntervention: (intervention: LabIntervention) => void;
}>;

export const RightInspector = ({ snapshot, selectedEntityId, onApplyLabIntervention }: RightInspectorProps) => {
  const selectedAnt = snapshot.ants.find((ant) => ant.id === selectedEntityId);
  const selectedFood = snapshot.foods.find((food) => food.id === selectedEntityId);
  const selectedNest = snapshot.nests.find((nest) => nest.id === selectedEntityId);
  const [hunger, setHunger] = useState('0');
  const [energy, setEnergy] = useState('100');

  useEffect(() => {
    if (selectedAnt) {
      setHunger(selectedAnt.hunger.toFixed(1));
      setEnergy(selectedAnt.energy.toFixed(1));
    }
  }, [selectedAnt]);

  const applyOverride = (field: AntScalarOverrideField, value: string) => {
    if (!selectedAnt) {
      return;
    }
    const parsedValue = Number(value);
    if (Number.isNaN(parsedValue)) {
      return;
    }
    onApplyLabIntervention({
      type: 'ant-scalar-override',
      antId: selectedAnt.id,
      field,
      value: parsedValue
    });
  };

  return (
    <aside className="w-96 shrink-0 overflow-auto border-l border-slate-800 bg-slate-950/90 p-4">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-300">Inspector de entidad</h2>
      {!selectedEntityId && <p className="mt-4 rounded border border-slate-800 bg-slate-900/70 p-3 text-sm text-slate-400">Selecciona una entidad para observar su estado simulado. La inspección no modifica el mundo.</p>}

      {selectedAnt && (
        <div className="mt-4 space-y-4">
          <Section title="Identidad">
            <Row label="ID" value={selectedAnt.id} />
            <Row label="Colonia" value={selectedAnt.colonyId} />
          </Section>
          <Section title="Estado">
            <Row label="Actividad" value={antStateLabels[selectedAnt.state]} />
            <Row label="Carga de comida" value={selectedAnt.carryingFood ? booleanFoodLabels.carrying : booleanFoodLabels.empty} />
          </Section>
          <Section title="Posición">
            <Row label="Plano x/z" value={`${selectedAnt.position.x.toFixed(2)}, ${selectedAnt.position.z.toFixed(2)}`} />
          </Section>
          <Section title="Variables internas">
            <Row label="Energía" value={selectedAnt.energy.toFixed(2)} />
            <Row label="Hambre" value={selectedAnt.hunger.toFixed(2)} />
            <Row label="Edad" value={selectedAnt.age.toFixed(0)} />
          </Section>
          <Section title="Overrides experimentales">
            <p className="mb-3 text-xs leading-relaxed text-slate-400">Modo Laboratorio: modifica variables existentes para observar consecuencias. No ordena decisiones, rutas ni tareas.</p>
            <OverrideControl label="Hambre" value={hunger} onChange={setHunger} onApply={() => applyOverride('hunger', hunger)} />
            <OverrideControl label="Energía" value={energy} onChange={setEnergy} onApply={() => applyOverride('energy', energy)} />
            <div className="mt-3 rounded border border-slate-800 bg-slate-900/60 p-3 text-xs text-slate-500">
              Rasgos avanzados pendientes: inteligencia, curiosidad, aprendizaje y memoria.
            </div>
          </Section>
        </div>
      )}

      {selectedFood && (
        <div className="mt-4 space-y-4">
          <Section title="Identidad">
            <Row label="ID" value={selectedFood.id} />
          </Section>
          <Section title="Recurso">
            <Row label="Cantidad" value={String(selectedFood.amount)} />
            <Row label="Posición x/z" value={`${selectedFood.position.x.toFixed(2)}, ${selectedFood.position.z.toFixed(2)}`} />
          </Section>
        </div>
      )}

      {selectedNest && (
        <div className="mt-4 space-y-4">
          <Section title="Identidad">
            <Row label="ID" value={selectedNest.id} />
            <Row label="Colonia" value={selectedNest.colonyId} />
          </Section>
          <Section title="Reservas">
            <Row label="Comida almacenada" value={String(selectedNest.storedFood)} />
          </Section>
        </div>
      )}
    </aside>
  );
};

const Section = ({ title, children }: Readonly<{ title: string; children: ReactNode }>) => (
  <section className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
    <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-cyan-300">{title}</h3>
    <div className="space-y-2">{children}</div>
  </section>
);

const Row = ({ label, value }: Readonly<{ label: string; value: string }>) => (
  <div className="flex justify-between gap-4 border-b border-slate-800 pb-1 last:border-b-0">
    <dt className="text-slate-500">{label}</dt>
    <dd className="text-right text-slate-100">{value}</dd>
  </div>
);

const OverrideControl = ({
  label,
  value,
  onChange,
  onApply
}: Readonly<{ label: string; value: string; onChange: (value: string) => void; onApply: () => void }>) => (
  <label className="block rounded border border-slate-800 bg-slate-950/60 p-2 text-xs text-slate-300">
    <span className="mb-2 block font-semibold text-slate-200">{label}</span>
    <div className="flex items-center gap-2">
      <input className="min-w-0 flex-1 rounded border border-slate-700 bg-slate-950 px-2 py-1 text-slate-100" max="100" min="0" onChange={(event) => onChange(event.target.value)} step="0.1" type="number" value={value} />
      <button className="rounded bg-cyan-700 px-2 py-1 font-semibold text-white hover:bg-cyan-600" onClick={onApply} type="button">
        Aplicar
      </button>
    </div>
  </label>
);
