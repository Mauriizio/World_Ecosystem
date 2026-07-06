import { describe, expect, it } from 'vitest';
import { createSimulation } from '../../src/simulation';

const runTicks = (seed: number, ticks: number) => {
  const simulation = createSimulation({ seed, antCount: 20 });
  let snapshot = simulation.snapshot();
  for (let index = 0; index < ticks; index += 1) {
    snapshot = simulation.tick();
  }
  return snapshot;
};

describe('simulación determinista', () => {
  it('produce el mismo resultado con la misma semilla y cantidad de ticks', () => {
    const first = runTicks(12345, 160);
    const second = runTicks(12345, 160);

    expect(second).toEqual(first);
  });

  it('crea el mundo inicial mínimo esperado', () => {
    const snapshot = createSimulation({ seed: 20260706, antCount: 20 }).snapshot();

    expect(snapshot.ants).toHaveLength(20);
    expect(snapshot.nests).toHaveLength(1);
    expect(snapshot.colonies).toHaveLength(1);
    expect(snapshot.foods.length).toBeGreaterThan(0);
  });
});
