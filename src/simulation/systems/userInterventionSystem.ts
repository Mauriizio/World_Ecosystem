import { createRendererSnapshot } from './rendererBridge';
import type {
  LabIntervention,
  LabInterventionQueueResult,
  LabInterventionResult,
  SimulationEvent,
  WorldState
} from '../world/worldTypes';

const maxEvents = 120;

const clampScalar = (value: number): number => Math.min(100, Math.max(0, value));

const formatScalar = (value: number): string => Number(value.toFixed(1)).toString();

const pushEvent = (world: WorldState, event: SimulationEvent): void => {
  world.events = [...world.events, event].slice(-maxEvents);
};

const applySingleLabIntervention = (world: WorldState, intervention: LabIntervention): LabInterventionResult => {
  if (intervention.type === 'ant-scalar-override') {
    const ant = world.ants.find((candidate) => candidate.id === intervention.antId);
    if (!ant) {
      return {
        applied: false,
        snapshot: createRendererSnapshot(world),
        message: `No se encontró la hormiga ${intervention.antId}.`
      };
    }

    const previousValue = ant[intervention.field];
    const nextValue = clampScalar(intervention.value);
    ant[intervention.field] = nextValue;

    const fieldLabel = intervention.field === 'hunger' ? 'hambre' : 'energía';
    const message = `Override experimental: ${fieldLabel} de ${ant.id} cambió de ${formatScalar(previousValue)} a ${formatScalar(nextValue)}.`;

    pushEvent(world, {
      tick: world.tick,
      type: 'experimental-override',
      entityId: ant.id,
      message
    });

    return {
      applied: true,
      snapshot: createRendererSnapshot(world),
      message
    };
  }

  return {
    applied: false,
    snapshot: createRendererSnapshot(world),
    message: 'Intervención de laboratorio no reconocida.'
  };
};

export const enqueueLabIntervention = (world: WorldState, intervention: LabIntervention): LabInterventionQueueResult => {
  world.pendingLabInterventions = [...world.pendingLabInterventions, intervention];
  return {
    queued: true,
    queueLength: world.pendingLabInterventions.length,
    snapshot: createRendererSnapshot(world),
    message: 'Intervención de laboratorio encolada.'
  };
};

export const applyQueuedLabInterventions = (world: WorldState): LabInterventionResult[] => {
  const queuedInterventions = world.pendingLabInterventions;
  world.pendingLabInterventions = [];
  return queuedInterventions.map((intervention) => applySingleLabIntervention(world, intervention));
};

export const applyLabIntervention = (world: WorldState, intervention: LabIntervention): LabInterventionResult => {
  enqueueLabIntervention(world, intervention);
  const results = applyQueuedLabInterventions(world);
  return results.at(-1) ?? {
    applied: false,
    snapshot: createRendererSnapshot(world),
    message: 'No se aplicó ninguna intervención de laboratorio.'
  };
};
