import { describe, expect, it } from 'vitest';
import { createSimulation } from '../../src/simulation';

const runExperimentWithOverride = () => {
  const simulation = createSimulation({ seed: 20260706, antCount: 20 });
  for (let index = 0; index < 12; index += 1) {
    simulation.tick();
  }
  simulation.applyLabIntervention({
    type: 'ant-scalar-override',
    antId: 'ant-004',
    field: 'hunger',
    value: 80
  });
  simulation.applyLabIntervention({
    type: 'ant-scalar-override',
    antId: 'ant-004',
    field: 'energy',
    value: 45
  });
  for (let index = 0; index < 20; index += 1) {
    simulation.tick();
  }
  return simulation.snapshot();
};

describe('intervenciones experimentales de laboratorio', () => {
  it('registran overrides sin romper determinismo cuando se repite la misma secuencia', () => {
    const first = runExperimentWithOverride();
    const second = runExperimentWithOverride();

    expect(second).toEqual(first);
    expect(first.events.some((event) => event.type === 'experimental-override')).toBe(true);
  });

  it('limitan hambre y energía al rango observable de 0 a 100', () => {
    const simulation = createSimulation({ seed: 20260706, antCount: 20 });
    simulation.applyLabIntervention({ type: 'ant-scalar-override', antId: 'ant-001', field: 'hunger', value: 140 });
    simulation.applyLabIntervention({ type: 'ant-scalar-override', antId: 'ant-001', field: 'energy', value: -20 });
    const ant = simulation.snapshot().ants.find((candidate) => candidate.id === 'ant-001');

    expect(ant?.hunger).toBe(100);
    expect(ant?.energy).toBe(0);
  });
});
