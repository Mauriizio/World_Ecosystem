import type { WorldState } from '../world/worldTypes';

export const runTimeSystem = (world: WorldState): void => {
  world.tick += 1;
  world.simulatedTime += world.tickDuration;
  world.experiment = { ...world.experiment, currentTick: world.tick };
};
