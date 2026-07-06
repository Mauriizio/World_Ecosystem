import { createSeededRandom } from '../random/seededRandom';
import { createRendererSnapshot } from '../systems/rendererBridge';
import { runStatisticsSystem } from '../systems/statisticsSystem';
import { applyLabIntervention, enqueueLabIntervention } from '../systems/userInterventionSystem';
import { createInitialWorld } from '../world/worldState';
import { runSimulationTick } from './tick';
import type { SimulationConfig, SimulationRuntime } from './simulationTypes';

export const createSimulation = (config: Partial<SimulationConfig> = {}): SimulationRuntime => {
  const seed = config.seed ?? 20260706;
  const resolvedConfig: SimulationConfig = {
    seed,
    antCount: config.antCount ?? 20,
    experimentId: config.experimentId ?? `experiment-${seed}`,
    experimentName: config.experimentName ?? 'Experimento sandbox inicial',
    initialEventMessage: config.initialEventMessage ?? `Experimento creado con seed ${seed}.`
  };
  const random = createSeededRandom(resolvedConfig.seed);
  const world = createInitialWorld(resolvedConfig);

  return {
    config: resolvedConfig,
    random,
    world,
    tick: () => runSimulationTick(world, random),
    snapshot: () => createRendererSnapshot(world),
    enqueueLabIntervention: (intervention) => enqueueLabIntervention(world, intervention),
    applyLabIntervention: (intervention) => {
      const result = applyLabIntervention(world, intervention);
      runStatisticsSystem(world);
      return { ...result, snapshot: createRendererSnapshot(world) };
    }
  };
};
