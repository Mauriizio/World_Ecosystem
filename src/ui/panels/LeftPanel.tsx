import type { ReactNode } from 'react';
import type { ReadonlyWorldSnapshot } from '../../simulation';
import { useUiStore } from '../../state/uiStore';
import type { ActiveTool, TerrainVisualPreset } from '../../state/uiStore';
import { antStateLabels } from '../presentation/labels';

type LeftPanelProps = Readonly<{
  snapshot: ReadonlyWorldSnapshot;
  selectedEntityId: string | null;
  activeTool: ActiveTool;
  onSelect: (id: string | null) => void;
  onToolSelect: (tool: ActiveTool) => void;
}>;

const futureTools = ['Cambiar humedad', 'Provocar lluvia', 'Agregar obstáculo', 'Introducir organismo'];

const terrainVisualPresetLabels: Record<TerrainVisualPreset, string> = {
  'lab-clear': 'Laboratorio claro',
  'dry-sand': 'Arena seca',
  'dry-grass': 'Pasto seco',
  'light-soil': 'Tierra clara'
};

export const LeftPanel = ({ snapshot, selectedEntityId, activeTool, onSelect, onToolSelect }: LeftPanelProps) => {
  const terrainVisualPreset = useUiStore((state) => state.terrainVisualPreset);
  const setTerrainVisualPreset = useUiStore((state) => state.setTerrainVisualPreset);
  const terrainVariation = useUiStore((state) => state.terrainVariation);
  const regenerateTerrainVisual = useUiStore((state) => state.regenerateTerrainVisual);
  const showTerrainGrid = useUiStore((state) => state.showTerrainGrid);
  const setShowTerrainGrid = useUiStore((state) => state.setShowTerrainGrid);

  return (
  <aside className="h-full min-h-0 w-80 shrink-0 overflow-y-auto border-r border-slate-800 bg-slate-950/95 p-3">
    <div className="flex min-h-full flex-col gap-3">
      <PanelSection title="Herramientas de laboratorio" tone="cyan">
        <div className="space-y-2">
          <button className={`w-full rounded border px-3 py-2 text-left text-sm ${activeTool === 'inspect' ? 'border-cyan-500 bg-cyan-900 text-white' : 'border-cyan-700 bg-cyan-950 text-cyan-100 hover:bg-cyan-900'}`} onClick={() => { onToolSelect('inspect'); onSelect(null); }}>
            Inspección ambiental
          </button>
          <div className="rounded border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-300">Inspector de entidad</div>
          <div className="rounded border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-300">Intervenciones experimentales desde inspector</div>
          <button className={`w-full rounded border px-3 py-2 text-left text-sm ${activeTool === 'place-food' ? 'border-emerald-400 bg-emerald-900 text-white' : 'border-emerald-700 bg-emerald-950 text-emerald-100 hover:bg-emerald-900'}`} onClick={() => onToolSelect('place-food')}>
            Colocar comida · cantidad 10
          </button>
        </div>
      </PanelSection>

      <PanelSection title="Visualización del terreno" tone="slate">
        <div className="space-y-2 text-xs text-slate-300">
          <label className="block space-y-1">
            <span className="font-semibold uppercase tracking-wide text-slate-400">Preset visual</span>
            <select
              className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-2 text-slate-100 outline-none hover:border-slate-500 focus:border-cyan-500"
              value={terrainVisualPreset}
              onChange={(event) => setTerrainVisualPreset(event.target.value as TerrainVisualPreset)}
            >
              {Object.entries(terrainVisualPresetLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <button className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-left text-slate-100 hover:bg-slate-800" onClick={regenerateTerrainVisual} type="button">
            Regenerar suelo · variación {terrainVariation + 1}
          </button>
          <label className="flex items-center gap-2 rounded border border-slate-800 bg-slate-900/60 px-3 py-2 text-slate-300">
            <input checked={showTerrainGrid} className="accent-cyan-500" onChange={(event) => setShowTerrainGrid(event.target.checked)} type="checkbox" />
            Mostrar grilla de orientación
          </label>
          <p className="text-[0.7rem] leading-snug text-slate-500">Solo cambia la presentación visual; no modifica terreno lógico, seed ni simulación.</p>
        </div>
      </PanelSection>

      <PanelSection title="Herramientas futuras" tone="slate">
        <div className="max-h-28 space-y-1 overflow-y-auto pr-1">
          {futureTools.map((tool) => (
            <button className="w-full cursor-not-allowed rounded border border-slate-800 bg-slate-900/40 px-3 py-2 text-left text-xs text-slate-500" disabled key={tool}>
              {tool} · pendiente v0.2+
            </button>
          ))}
        </div>
      </PanelSection>

      <div className="grid min-h-[22rem] flex-1 grid-rows-[minmax(12rem,1fr)_minmax(9rem,0.8fr)] gap-3">
        <PanelSection title={`Hormigas (${snapshot.ants.length})`} tone="cyan" scrollable>
          <div className="space-y-1 pr-1">
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
        </PanelSection>

        <PanelSection title="Recursos y nido" tone="emerald" scrollable>
          <div className="space-y-1 pr-1">
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
        </PanelSection>
      </div>
    </div>
  </aside>
  );
};

const toneClasses = {
  cyan: 'text-cyan-300',
  emerald: 'text-emerald-300',
  slate: 'text-slate-500'
} as const;

const PanelSection = ({
  title,
  tone,
  scrollable = false,
  children
}: Readonly<{ title: string; tone: keyof typeof toneClasses; scrollable?: boolean; children: ReactNode }>) => (
  <section className="flex min-h-0 flex-col rounded-lg border border-slate-800 bg-slate-950/70 p-3 shadow-inner shadow-black/20">
    <h2 className={`mb-2 shrink-0 text-xs font-semibold uppercase tracking-widest ${toneClasses[tone]}`}>{title}</h2>
    <div className={scrollable ? 'min-h-0 flex-1 overflow-y-auto' : 'shrink-0'}>{children}</div>
  </section>
);
