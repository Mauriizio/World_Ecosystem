import { describe, expect, it } from 'vitest';
import { createSimulation } from '../../src/simulation';

const runExperimentWithQueuedOverrides = () => {
  const simulation = createSimulation({ seed: 20260706, antCount: 20 });
  for (let index = 0; index < 12; index += 1) {
    simulation.tick();
  }
  simulation.enqueueLabIntervention({
    type: 'ant-scalar-override',
    antId: 'ant-004',
    field: 'hunger',
    value: 80
  });
  simulation.enqueueLabIntervention({
    type: 'ant-scalar-override',
    antId: 'ant-004',
    field: 'energy',
    value: 45
  });
  simulation.tick();
  for (let index = 0; index < 20; index += 1) {
    simulation.tick();
  }
  return simulation.snapshot();
};

const runExperimentWithPlacedFood = () => {
  const simulation = createSimulation({ seed: 20260706, antCount: 20 });
  simulation.enqueueLabIntervention({ type: 'place-food', position: { x: 20, z: 20 }, amount: 10 });
  simulation.enqueueLabIntervention({ type: 'place-food', position: { x: -20, z: -20 }, amount: 7 });
  simulation.tick();
  for (let index = 0; index < 8; index += 1) {
    simulation.tick();
  }
  return simulation.snapshot();
};

describe('intervenciones experimentales de laboratorio', () => {
  it('aplica una intervención encolada durante el siguiente tick', () => {
    const simulation = createSimulation({ seed: 20260706, antCount: 20 });
    simulation.enqueueLabIntervention({ type: 'ant-scalar-override', antId: 'ant-001', field: 'hunger', value: 70 });

    expect(simulation.snapshot().ants.find((candidate) => candidate.id === 'ant-001')?.hunger).toBe(0);

    simulation.tick();

    expect(simulation.snapshot().ants.find((candidate) => candidate.id === 'ant-001')?.hunger).toBeGreaterThanOrEqual(70);
    expect(simulation.snapshot().events.some((event) => event.type === 'experimental-override')).toBe(true);
  });

  it('aplica dos intervenciones encoladas en orden de llegada', () => {
    const simulation = createSimulation({ seed: 20260706, antCount: 20 });
    simulation.enqueueLabIntervention({ type: 'ant-scalar-override', antId: 'ant-002', field: 'hunger', value: 30 });
    simulation.enqueueLabIntervention({ type: 'ant-scalar-override', antId: 'ant-002', field: 'hunger', value: 80 });

    simulation.tick();

    const events = simulation.snapshot().events.filter((event) => event.type === 'experimental-override' && event.entityId === 'ant-002');
    expect(events.map((event) => event.message)).toEqual([
      'Override experimental: hambre de ant-002 cambió de 0 a 30.',
      'Override experimental: hambre de ant-002 cambió de 30 a 80.'
    ]);
    expect(simulation.snapshot().ants.find((candidate) => candidate.id === 'ant-002')?.hunger).toBeGreaterThanOrEqual(80);
  });

  it('crea una fuente de comida mediante intervención ambiental', () => {
    const simulation = createSimulation({ seed: 20260706, antCount: 20 });
    const before = simulation.snapshot();

    const result = simulation.applyLabIntervention({ type: 'place-food', position: { x: 12.4, z: -8.2 }, amount: 10 });
    const after = result.snapshot;
    const createdFood = after.foods.at(-1);

    expect(after.foods).toHaveLength(before.foods.length + 1);
    expect(createdFood?.position).toEqual({ x: 12.4, z: -8.2 });
    expect(createdFood?.amount).toBe(10);
    expect(after.stats.foodSources).toBe(before.stats.foodSources + 1);
    expect(after.stats.totalFoodAmount).toBe(before.stats.totalFoodAmount + 10);
    expect(after.events.at(-1)?.message).toBe('Intervención ambiental: comida colocada en x=12.4, z=-8.2, cantidad=10.');
  });

  it('aplica dos intervenciones de colocar comida en orden', () => {
    const simulation = createSimulation({ seed: 20260706, antCount: 20 });
    simulation.enqueueLabIntervention({ type: 'place-food', position: { x: 20, z: 20 }, amount: 10 });
    simulation.enqueueLabIntervention({ type: 'place-food', position: { x: -20, z: -20 }, amount: 7 });

    simulation.tick();

    const placedFoods = simulation.snapshot().foods.slice(-2);
    expect(placedFoods.map((food) => food.id)).toEqual(['food-005', 'food-006']);
    expect(placedFoods.map((food) => food.position)).toEqual([
      { x: 20, z: 20 },
      { x: -20, z: -20 }
    ]);
    expect(placedFoods.map((food) => food.amount)).toEqual([10, 7]);
  });

  it('registra overrides sin romper determinismo cuando se repite la misma secuencia', () => {
    const first = runExperimentWithQueuedOverrides();
    const second = runExperimentWithQueuedOverrides();

    expect(second).toEqual(first);
    expect(first.events.some((event) => event.type === 'experimental-override')).toBe(true);
  });

  it('mantiene determinismo al repetir la misma secuencia de colocar comida', () => {
    const first = runExperimentWithPlacedFood();
    const second = runExperimentWithPlacedFood();

    expect(second).toEqual(first);
    expect(first.events.filter((event) => event.type === 'environmental-intervention')).toHaveLength(2);
  });

  it('limita hambre y energía al rango observable de 0 a 100', () => {
    const simulation = createSimulation({ seed: 20260706, antCount: 20 });
    simulation.applyLabIntervention({ type: 'ant-scalar-override', antId: 'ant-001', field: 'hunger', value: 140 });
    simulation.applyLabIntervention({ type: 'ant-scalar-override', antId: 'ant-001', field: 'energy', value: -20 });
    const ant = simulation.snapshot().ants.find((candidate) => candidate.id === 'ant-001');

    expect(ant?.hunger).toBe(100);
    expect(ant?.energy).toBe(0);
  });
});
