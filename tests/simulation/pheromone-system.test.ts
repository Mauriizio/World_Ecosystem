import { describe, expect, it } from 'vitest';
import { distance } from '../../src/simulation/core/vector';
import { createSimulation } from '../../src/simulation';
import {
  depositFoodPheromone,
  foodPheromoneFollowProbability,
  foodPheromoneInfluence,
  runPheromoneSystem,
  sampleFoodPheromoneSignal
} from '../../src/simulation/systems/pheromoneSystem';

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

    depositFoodPheromone(simulation.world, { x: 4.2, z: -3.1 }, simulation.world.foodPheromoneGrid.depositAmount, { x: 1, z: 0 });

    expect(simulation.world.foodPheromoneGrid.depositAmount).toBeGreaterThan(5);
    expect(simulation.world.foodPheromoneGrid.cells).toHaveLength(1);
    expect(simulation.world.foodPheromoneGrid.cells[0]?.intensity).toBe(simulation.world.foodPheromoneGrid.depositAmount);
    expect(simulation.world.foodPheromoneGrid.cells[0]?.trailDirection).toEqual({ x: 1, z: 0 });
    expect(simulation.world.foodPheromoneGrid.lastDepositTick).toBe(0);
  });

  it('evapora feromonas con ticks del sistema', () => {
    const simulation = createSimulation({ seed: 20260706, antCount: 20 });
    depositFoodPheromone(simulation.world, { x: 4.2, z: -3.1 }, 10, { x: 1, z: 0 });
    const initialIntensity = simulation.world.foodPheromoneGrid.cells[0]?.intensity ?? 0;

    runPheromoneSystem(simulation.world);

    const nextIntensity = simulation.world.foodPheromoneGrid.cells[0]?.intensity ?? 0;
    expect(nextIntensity).toBeLessThan(initialIntensity);
    expect(nextIntensity).toBeGreaterThan(0);
  });

  it('mantiene un rastro detectable durante varios ticks', () => {
    const simulation = createSimulation({ seed: 20260706, antCount: 20 });
    depositFoodPheromone(simulation.world, { x: 4.2, z: -3.1 }, simulation.world.foodPheromoneGrid.depositAmount, { x: 1, z: 0 });

    for (let index = 0; index < 80; index += 1) {
      runPheromoneSystem(simulation.world);
    }

    const lingeringSignal = sampleFoodPheromoneSignal(simulation.world, { x: 4, z: -3 });
    expect(simulation.world.foodPheromoneGrid.cells).toHaveLength(1);
    expect(lingeringSignal?.intensity).toBeGreaterThan(1);
    expect(lingeringSignal?.direction.x).toBeGreaterThan(0);
  });

  it('permite detectar una señal local sin conocimiento global', () => {
    const simulation = createSimulation({ seed: 20260706, antCount: 20 });
    depositFoodPheromone(simulation.world, { x: 2.1, z: 0.2 }, 8, { x: 1, z: 0 });

    const nearSignal = sampleFoodPheromoneSignal(simulation.world, { x: 1.7, z: 0.1 });
    const mediumSignal = sampleFoodPheromoneSignal(simulation.world, { x: 5.2, z: 0.1 });
    const farSignal = sampleFoodPheromoneSignal(simulation.world, { x: -15, z: -15 });

    expect(nearSignal?.intensity).toBeGreaterThan(0);
    expect(mediumSignal?.intensity).toBeGreaterThan(0);
    expect(farSignal).toBeUndefined();
  });

  it('una señal local fuerte tiene más probabilidad e influencia que una débil', () => {
    const weakProbability = foodPheromoneFollowProbability(0.5);
    const strongProbability = foodPheromoneFollowProbability(12);
    const weakInfluence = foodPheromoneInfluence(0.5);
    const strongInfluence = foodPheromoneInfluence(12);

    expect(strongProbability).toBeGreaterThan(weakProbability);
    expect(strongProbability).toBeGreaterThan(0.85);
    expect(strongInfluence).toBeGreaterThan(weakInfluence);
    expect(strongInfluence).toBeGreaterThan(0.75);
  });

  it('la feromona guía hacia comida y no atrae al centro de la celda portadora', () => {
    const simulation = createSimulation({ seed: 20260706, antCount: 20 });
    depositFoodPheromone(simulation.world, { x: 0, z: 0 }, 12, { x: 1, z: 0 });

    const signal = sampleFoodPheromoneSignal(simulation.world, { x: 4, z: 0 });

    expect(signal?.direction.x).toBeGreaterThan(0);
    expect(signal?.direction.z).toBe(0);
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
    ant.knownFoodSourceId = 'food-001';
    ant.knownFoodSourcePosition = { x: 8, z: 0 };

    const snapshot = simulation.tick();
    const signal = sampleFoodPheromoneSignal(simulation.world, { x: 4, z: 0 });

    expect(snapshot.stats.foodPheromoneActiveCells).toBeGreaterThan(0);
    expect(snapshot.stats.foodPheromoneTotalIntensity).toBeGreaterThan(simulation.world.foodPheromoneGrid.depositAmount);
    expect(snapshot.stats.foodPheromoneLastDepositTick).toBe(snapshot.tick);
    expect(signal?.direction.x).toBeGreaterThan(0);
  });

  it('una hormiga que entrega comida conserva memoria individual de la fuente', () => {
    const simulation = createSimulation({ seed: 20260706, antCount: 1 });
    const ant = simulation.world.ants[0];
    if (!ant) {
      throw new Error('La simulación de prueba debe crear una hormiga.');
    }
    ant.position = { x: 12, z: 8 };
    simulation.tick();
    ant.position = { x: 0.3, z: 0 };

    const snapshot = simulation.tick();

    expect(snapshot.ants[0]?.carryingFood).toBe(false);
    expect(snapshot.ants[0]?.knownFoodSourceId).toBe('food-001');
    expect(snapshot.ants[0]?.knownFoodSourcePosition).toEqual({ x: 12, z: 8 });
    expect(snapshot.ants[0]?.lastFoodSuccessTick).toBe(snapshot.tick);
  });

  it('una hormiga con memoria individual intenta volver hacia su fuente', () => {
    const simulation = createSimulation({ seed: 20260706, antCount: 1 });
    const ant = simulation.world.ants[0];
    if (!ant) {
      throw new Error('La simulación de prueba debe crear una hormiga.');
    }
    ant.position = { x: 0, z: 0 };
    ant.knownFoodSourceId = 'food-001';
    ant.knownFoodSourcePosition = { x: 12, z: 8 };
    const initialDistance = distance(ant.position, ant.knownFoodSourcePosition);

    const snapshot = simulation.tick();
    const updatedAnt = snapshot.ants[0];
    if (!updatedAnt) {
      throw new Error('La simulación de prueba debe conservar la hormiga.');
    }

    expect(updatedAnt.state).toBe('seekingFood');
    expect(updatedAnt.knownFoodSourceId).toBe('food-001');
    expect(distance(updatedAnt.position, { x: 12, z: 8 })).toBeLessThan(initialDistance);
  });

  it('limpia la memoria individual si la fuente recordada está agotada', () => {
    const simulation = createSimulation({ seed: 20260706, antCount: 1 });
    const ant = simulation.world.ants[0];
    const food = simulation.world.foods[0];
    if (!ant || !food) {
      throw new Error('La simulación de prueba debe crear una hormiga y una fuente.');
    }
    food.position = { x: 2, z: 0 };
    food.amount = 0;
    ant.position = { x: 1.2, z: 0 };
    ant.knownFoodSourceId = food.id;
    ant.knownFoodSourcePosition = food.position;

    for (let index = 0; index < 3; index += 1) {
      simulation.tick();
    }

    expect(simulation.snapshot().ants[0]?.knownFoodSourceId).toBeUndefined();
    expect(simulation.snapshot().ants[0]?.knownFoodSourcePosition).toBeUndefined();
  });

  it('la separación local evita posiciones idénticas entre hormigas superpuestas', () => {
    const simulation = createSimulation({ seed: 20260706, antCount: 2 });
    const firstAnt = simulation.world.ants[0];
    const secondAnt = simulation.world.ants[1];
    if (!firstAnt || !secondAnt) {
      throw new Error('La simulación de prueba debe crear dos hormigas.');
    }
    firstAnt.position = { x: 0, z: 0 };
    secondAnt.position = { x: 0, z: 0 };
    firstAnt.direction = { x: 1, z: 0 };
    secondAnt.direction = { x: 1, z: 0 };

    const snapshot = simulation.tick();
    const [firstSnapshotAnt, secondSnapshotAnt] = snapshot.ants;
    if (!firstSnapshotAnt || !secondSnapshotAnt) {
      throw new Error('La simulación de prueba debe conservar dos hormigas.');
    }

    expect(distance(firstSnapshotAnt.position, secondSnapshotAnt.position)).toBeGreaterThan(0.05);
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
