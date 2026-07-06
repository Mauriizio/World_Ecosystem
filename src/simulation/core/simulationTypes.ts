import type { SeededRandom } from '../random/seededRandom';
import type { LabIntervention, LabInterventionResult, ReadonlyWorldSnapshot, WorldState } from '../world/worldTypes';

export type SimulationConfig = Readonly<{
  seed: number;
  antCount: number;
}>;

export type SimulationRuntime = {
  readonly config: SimulationConfig;
  readonly random: SeededRandom;
  readonly world: WorldState;
  tick: () => ReadonlyWorldSnapshot;
  snapshot: () => ReadonlyWorldSnapshot;
  applyLabIntervention: (intervention: LabIntervention) => LabInterventionResult;
};
