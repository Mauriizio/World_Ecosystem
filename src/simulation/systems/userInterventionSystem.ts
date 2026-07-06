import { createRendererSnapshot } from './rendererBridge';
import type {
  Food,
  InterventionHistoryEntry,
  LabIntervention,
  LabInterventionQueueResult,
  LabInterventionResult,
  QueuedLabIntervention,
  SimulationEvent,
  Vector2,
  WorldState
} from '../world/worldTypes';

const maxEvents = 120;

const clampScalar = (value: number): number => Math.min(100, Math.max(0, value));

const clampFoodAmount = (value: number): number => Math.round(Math.min(100, Math.max(1, value)));

const formatScalar = (value: number): string => Number(value.toFixed(1)).toString();

const formatCoordinate = (value: number): string => Number(value.toFixed(1)).toString();

const pushEvent = (world: WorldState, event: SimulationEvent): void => {
  world.events = [...world.events, event].slice(-maxEvents);
};

const clampPositionToWorld = (world: WorldState, position: Vector2): Vector2 => ({
  x: Math.min(world.bounds.maxX, Math.max(world.bounds.minX, position.x)),
  z: Math.min(world.bounds.maxZ, Math.max(world.bounds.minZ, position.z))
});

const createFoodId = (world: WorldState): string => `food-${String(world.foods.length + 1).padStart(3, '0')}`;

const createInterventionId = (world: WorldState): string => `intervention-${String(world.interventionHistory.length + 1).padStart(4, '0')}`;

const recordIntervention = (world: WorldState, entry: InterventionHistoryEntry): void => {
  world.interventionHistory = [...world.interventionHistory, entry];
  world.experiment = { ...world.experiment, interventionCount: world.interventionHistory.length, currentTick: world.tick };
};

const applySingleLabIntervention = (world: WorldState, queued: QueuedLabIntervention): LabInterventionResult => {
  const { intervention, requestedTick, source } = queued;
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
    recordIntervention(world, {
      id: createInterventionId(world),
      type: intervention.type,
      requestedTick,
      appliedTick: world.tick,
      source,
      payload: { antId: ant.id, field: intervention.field, previousValue, value: nextValue },
      message
    });

    return {
      applied: true,
      snapshot: createRendererSnapshot(world),
      message
    };
  }

  if (intervention.type === 'place-food') {
    const position = clampPositionToWorld(world, intervention.position);
    const amount = clampFoodAmount(intervention.amount);
    const food: Food = {
      id: createFoodId(world),
      position,
      amount
    };
    world.foods = [...world.foods, food];

    const message = `Intervención ambiental: comida colocada en x=${formatCoordinate(position.x)}, z=${formatCoordinate(position.z)}, cantidad=${amount}.`;

    pushEvent(world, {
      tick: world.tick,
      type: 'environmental-intervention',
      entityId: food.id,
      message
    });
    recordIntervention(world, {
      id: createInterventionId(world),
      type: intervention.type,
      requestedTick,
      appliedTick: world.tick,
      source,
      payload: { foodId: food.id, x: position.x, z: position.z, amount },
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
  world.pendingLabInterventions = [...world.pendingLabInterventions, { intervention, requestedTick: world.tick, source: 'user-laboratory' }];
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
  return queuedInterventions.map((queued) => applySingleLabIntervention(world, queued));
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
