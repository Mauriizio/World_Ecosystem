export type EntityId = string;

export type Vector2 = Readonly<{
  x: number;
  z: number;
}>;

export type WorldBounds = Readonly<{
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}>;

export type AntState = 'exploring' | 'seekingFood' | 'returningToNest';

export type AntScalarOverrideField = 'hunger' | 'energy';

export type ExperimentMode = 'sandbox' | 'natural';

export type InterventionSource = 'user-laboratory';

export type Ant = {
  id: EntityId;
  colonyId: EntityId;
  position: Vector2;
  direction: Vector2;
  energy: number;
  hunger: number;
  age: number;
  state: AntState;
  carryingFood: boolean;
};

export type Food = {
  id: EntityId;
  position: Vector2;
  amount: number;
};

export type Nest = {
  id: EntityId;
  colonyId: EntityId;
  position: Vector2;
  storedFood: number;
};

export type Colony = {
  id: EntityId;
  name: string;
  nestId: EntityId;
  antIds: EntityId[];
  deliveredFood: number;
};

export type ExperimentMetadata = Readonly<{
  experimentId: string;
  experimentName: string;
  seed: number;
  startTick: number;
  currentTick: number;
  interventionCount: number;
  mode: ExperimentMode;
}>;

export type SimulationEvent = Readonly<{
  tick: number;
  type: 'food-detected' | 'food-picked' | 'food-delivered' | 'experiment-reset' | 'experimental-override' | 'environmental-intervention';
  message: string;
  entityId?: EntityId;
}>;

export type AntScalarOverride = Readonly<{
  type: 'ant-scalar-override';
  antId: EntityId;
  field: AntScalarOverrideField;
  value: number;
}>;

export type PlaceFoodIntervention = Readonly<{
  type: 'place-food';
  position: Vector2;
  amount: number;
}>;

export type LabIntervention = AntScalarOverride | PlaceFoodIntervention;

export type InterventionHistoryPayload = Readonly<{
  antId?: EntityId;
  foodId?: EntityId;
  field?: AntScalarOverrideField;
  previousValue?: number;
  value?: number;
  x?: number;
  z?: number;
  amount?: number;
}>;

export type InterventionHistoryEntry = Readonly<{
  id: string;
  type: LabIntervention['type'];
  requestedTick: number;
  appliedTick: number;
  source: InterventionSource;
  payload: InterventionHistoryPayload;
  message: string;
}>;

export type QueuedLabIntervention = Readonly<{
  intervention: LabIntervention;
  requestedTick: number;
  source: InterventionSource;
}>;

export type LabInterventionResult = Readonly<{
  applied: boolean;
  snapshot: ReadonlyWorldSnapshot;
  message: string;
}>;

export type LabInterventionQueueResult = Readonly<{
  queued: boolean;
  queueLength: number;
  snapshot: ReadonlyWorldSnapshot;
  message: string;
}>;

export type WorldStats = Readonly<{
  antCount: number;
  foodSources: number;
  totalFoodAmount: number;
  carriedFood: number;
  nestStoredFood: number;
}>;

export type WorldState = {
  seed: number;
  tick: number;
  simulatedTime: number;
  tickDuration: number;
  experiment: ExperimentMetadata;
  bounds: WorldBounds;
  ants: Ant[];
  foods: Food[];
  nests: Nest[];
  colonies: Colony[];
  events: SimulationEvent[];
  pendingLabInterventions: QueuedLabIntervention[];
  interventionHistory: InterventionHistoryEntry[];
  stats: WorldStats;
};

export type ReadonlyWorldSnapshot = Readonly<{
  seed: number;
  tick: number;
  simulatedTime: number;
  experiment: ExperimentMetadata;
  bounds: WorldBounds;
  ants: readonly Readonly<Ant>[];
  foods: readonly Readonly<Food>[];
  nests: readonly Readonly<Nest>[];
  colonies: readonly Readonly<Colony>[];
  events: readonly SimulationEvent[];
  interventionHistory: readonly InterventionHistoryEntry[];
  stats: WorldStats;
}>;
