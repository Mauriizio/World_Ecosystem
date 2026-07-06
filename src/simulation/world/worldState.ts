import { createSeededRandom } from '../random/seededRandom';
import type { Ant, Colony, Food, Nest, WorldBounds, WorldState } from './worldTypes';

export type InitialWorldOptions = Readonly<{
  seed: number;
  antCount?: number;
}>;

const bounds: WorldBounds = {
  minX: -24,
  maxX: 24,
  minZ: -24,
  maxZ: 24
};

export const createInitialWorld = ({ seed, antCount = 20 }: InitialWorldOptions): WorldState => {
  const random = createSeededRandom(seed);
  const colonyId = 'colony-001';
  const nestId = 'nest-001';

  const nest: Nest = {
    id: nestId,
    colonyId,
    position: { x: 0, z: 0 },
    storedFood: 0
  };

  const ants: Ant[] = Array.from({ length: antCount }, (_, index) => ({
    id: `ant-${String(index + 1).padStart(3, '0')}`,
    colonyId,
    position: {
      x: random.nextRange(-2, 2),
      z: random.nextRange(-2, 2)
    },
    direction: {
      x: random.nextSigned(),
      z: random.nextSigned()
    },
    energy: 100,
    hunger: 0,
    age: 0,
    state: 'exploring',
    carryingFood: false
  }));

  const foods: Food[] = [
    { id: 'food-001', position: { x: 12, z: 8 }, amount: 10 },
    { id: 'food-002', position: { x: -14, z: 10 }, amount: 8 },
    { id: 'food-003', position: { x: 8, z: -13 }, amount: 12 },
    { id: 'food-004', position: { x: -10, z: -11 }, amount: 6 }
  ];

  const colony: Colony = {
    id: colonyId,
    name: 'Colonia inicial',
    nestId,
    antIds: ants.map((ant) => ant.id),
    deliveredFood: 0
  };

  return {
    seed,
    tick: 0,
    simulatedTime: 0,
    tickDuration: 1,
    bounds,
    ants,
    foods,
    nests: [nest],
    colonies: [colony],
    events: [{ tick: 0, type: 'experiment-reset', message: 'Experimento inicial creado.' }],
    stats: {
      antCount: ants.length,
      foodSources: foods.length,
      totalFoodAmount: foods.reduce((total, food) => total + food.amount, 0),
      carriedFood: 0,
      nestStoredFood: 0
    }
  };
};
