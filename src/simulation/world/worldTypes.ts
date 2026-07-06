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

export type SimulationEvent = Readonly<{
  tick: number;
  type: 'food-detected' | 'food-picked' | 'food-delivered' | 'experiment-reset';
  message: string;
  entityId?: EntityId;
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
  bounds: WorldBounds;
  ants: Ant[];
  foods: Food[];
  nests: Nest[];
  colonies: Colony[];
  events: SimulationEvent[];
  stats: WorldStats;
};

export type ReadonlyWorldSnapshot = Readonly<{
  seed: number;
  tick: number;
  simulatedTime: number;
  bounds: WorldBounds;
  ants: readonly Readonly<Ant>[];
  foods: readonly Readonly<Food>[];
  nests: readonly Readonly<Nest>[];
  colonies: readonly Readonly<Colony>[];
  events: readonly SimulationEvent[];
  stats: WorldStats;
}>;
