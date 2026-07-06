import { createSeededRandom } from '../random/seededRandom';
import { createRendererSnapshot } from '../systems/rendererBridge';
import { createInitialWorld } from '../world/worldState';
import { runSimulationTick } from './tick';
import type { SimulationConfig, SimulationRuntime } from './simulationTypes';

export const createSimulation = (config: Partial<SimulationConfig> = {}): SimulationRuntime => {
  const resolvedConfig: SimulationConfig = {
    seed: config.seed ?? 20260706,
    antCount: config.antCount ?? 20
  };
  const random = createSeededRandom(resolvedConfig.seed);
  const world = createInitialWorld(resolvedConfig);

  return {
    config: resolvedConfig,
    random,
    world,
    tick: () => runSimulationTick(world, random),
    snapshot: () => createRendererSnapshot(world)
  };
};
