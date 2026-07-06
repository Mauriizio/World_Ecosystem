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

  it('registra overrides sin romper determinismo cuando se repite la misma secuencia', () => {
    const first = runExperimentWithQueuedOverrides();
    const second = runExperimentWithQueuedOverrides();

    expect(second).toEqual(first);
    expect(first.events.some((event) => event.type === 'experimental-override')).toBe(true);
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
