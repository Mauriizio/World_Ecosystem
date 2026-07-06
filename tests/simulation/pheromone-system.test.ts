import { describe, expect, it } from 'vitest';
import { createSimulation } from '../../src/simulation';
import { depositFoodPheromone, runPheromoneSystem, sampleFoodPheromoneSignal } from '../../src/simulation/systems/pheromoneSystem';

const runExperiment = () => {
  const simulation = createSimulation({ seed: 20260706, antCount: 20 });
  for (let index = 0; index < 140; index += 1) {
    simulation.tick();
  }
  return simulation.snapshot();
};

describe('PheromoneSystem v0.2', () => {
  it('deposita feromona de alimento y aumenta concentración local', () => {
    const simulation = createSimulation({ seed: 20260706, antCount: 20 });

    depositFoodPheromone(simulation.world, { x: 4.2, z: -3.1 }, 3);

    expect(simulation.world.foodPheromoneGrid.cells).toHaveLength(1);
    expect(simulation.world.foodPheromoneGrid.cells[0]?.intensity).toBe(3);
    expect(simulation.world.foodPheromoneGrid.lastDepositTick).toBe(0);
  });

  it('evapora feromonas con ticks del sistema', () => {
    const simulation = createSimulation({ seed: 20260706, antCount: 20 });
    depositFoodPheromone(simulation.world, { x: 4.2, z: -3.1 }, 10);
    const initialIntensity = simulation.world.foodPheromoneGrid.cells[0]?.intensity ?? 0;

    runPheromoneSystem(simulation.world);

    const nextIntensity = simulation.world.foodPheromoneGrid.cells[0]?.intensity ?? 0;
    expect(nextIntensity).toBeLessThan(initialIntensity);
    expect(nextIntensity).toBeGreaterThan(0);
  });

  it('permite detectar una señal local sin conocimiento global', () => {
    const simulation = createSimulation({ seed: 20260706, antCount: 20 });
    depositFoodPheromone(simulation.world, { x: 2.1, z: 0.2 }, 8);

    const nearSignal = sampleFoodPheromoneSignal(simulation.world, { x: 1.7, z: 0.1 });
    const farSignal = sampleFoodPheromoneSignal(simulation.world, { x: -15, z: -15 });

    expect(nearSignal?.intensity).toBeGreaterThan(0);
    expect(farSignal).toBeUndefined();
  });

  it('una hormiga cargando comida deposita feromona durante el retorno', () => {
    const simulation = createSimulation({ seed: 20260706, antCount: 1 });
    const ant = simulation.world.ants[0];
    if (!ant) {
      throw new Error('La simulación de prueba debe crear una hormiga.');
    }
    ant.position = { x: 4, z: 0 };
    ant.direction = { x: -1, z: 0 };
    ant.carryingFood = true;
    ant.state = 'returningToNest';

    const snapshot = simulation.tick();

    expect(snapshot.stats.foodPheromoneActiveCells).toBeGreaterThan(0);
    expect(snapshot.stats.foodPheromoneTotalIntensity).toBeGreaterThan(0);
    expect(snapshot.stats.foodPheromoneLastDepositTick).toBe(snapshot.tick);
  });

  it('una fuente de comida produce feromona después de que una hormiga recoge y retorna', () => {
    const simulation = createSimulation({ seed: 20260706, antCount: 1 });
    const ant = simulation.world.ants[0];
    if (!ant) {
      throw new Error('La simulación de prueba debe crear una hormiga.');
    }
    ant.position = { x: 12, z: 8 };
    ant.direction = { x: 1, z: 0 };

    simulation.tick();
    expect(simulation.snapshot().ants[0]?.carryingFood).toBe(true);

    const snapshot = simulation.tick();

    expect(snapshot.stats.foodPheromoneActiveCells).toBeGreaterThan(0);
    expect(snapshot.foodPheromoneGrid.lastDepositTick).toBe(snapshot.tick);
  });

  it('mantiene determinismo con la misma seed y la misma cantidad de ticks', () => {
    const first = runExperiment();
    const second = runExperiment();

    expect(second.foodPheromoneGrid).toEqual(first.foodPheromoneGrid);
    expect(second.stats.foodPheromoneActiveCells).toBe(first.stats.foodPheromoneActiveCells);
    expect(second.stats.foodPheromoneTotalIntensity).toBe(first.stats.foodPheromoneTotalIntensity);
    expect(second).toEqual(first);
  });
});
