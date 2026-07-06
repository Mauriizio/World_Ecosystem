import type { ReadonlyWorldSnapshot, WorldState } from '../world/worldTypes';

const cloneWorld = <T>(value: T): T => {
  if (typeof structuredClone === 'function') {
    return structuredClone(value) as T;
  }
  return JSON.parse(JSON.stringify(value)) as T;
};

export const createRendererSnapshot = (world: WorldState): ReadonlyWorldSnapshot =>
  Object.freeze(cloneWorld({
    seed: world.seed,
    tick: world.tick,
    simulatedTime: world.simulatedTime,
    bounds: world.bounds,
    ants: world.ants,
    foods: world.foods,
    nests: world.nests,
    colonies: world.colonies,
    events: world.events,
    stats: world.stats
  }));
