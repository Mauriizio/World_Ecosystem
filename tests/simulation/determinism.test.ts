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
    expect(snapshot.experiment.seed).toBe(20260706);
    expect(snapshot.experiment.mode).toBe('sandbox');
  });

  it('crear una simulación con la misma seed produce el mismo estado inicial', () => {
    const first = createSimulation({ seed: 3456, antCount: 20 }).snapshot();
    const second = createSimulation({ seed: 3456, antCount: 20 }).snapshot();

    expect(second).toEqual(first);
  });

  it('reiniciar con la misma seed reproduce el estado inicial del experimento', () => {
    const simulation = createSimulation({ seed: 4567, antCount: 20 });
    const initial = simulation.snapshot();
    simulation.tick();
    simulation.tick();

    const restarted = createSimulation({ seed: simulation.config.seed, antCount: simulation.config.antCount }).snapshot();

    expect(restarted.ants).toEqual(initial.ants);
    expect(restarted.foods).toEqual(initial.foods);
    expect(restarted.experiment.seed).toBe(initial.experiment.seed);
  });

  it('un nuevo experimento puede recibir una seed distinta', () => {
    const first = createSimulation({ seed: 1111, antCount: 20 }).snapshot();
    const second = createSimulation({ seed: 2222, antCount: 20 }).snapshot();

    expect(second.experiment.seed).toBe(2222);
    expect(second.experiment.seed).not.toBe(first.experiment.seed);
    expect(second.ants).not.toEqual(first.ants);
  });
});
