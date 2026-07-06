import type { SeededRandom } from '../random/seededRandom';
import { runAntBehaviorSystem } from '../systems/antBehaviorSystem';
import { runPheromoneSystem } from '../systems/pheromoneSystem';
import { createRendererSnapshot } from '../systems/rendererBridge';
import { runStatisticsSystem } from '../systems/statisticsSystem';
import { applyQueuedLabInterventions } from '../systems/userInterventionSystem';
import { runTimeSystem } from '../systems/timeSystem';
import type { ReadonlyWorldSnapshot, WorldState } from '../world/worldTypes';

export const runSimulationTick = (world: WorldState, random: SeededRandom): ReadonlyWorldSnapshot => {
  runTimeSystem(world);
  applyQueuedLabInterventions(world);
  runPheromoneSystem(world);
  runAntBehaviorSystem(world, random);
  runStatisticsSystem(world);
  return createRendererSnapshot(world);
};
