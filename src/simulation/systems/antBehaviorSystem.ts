import { clampToBounds, distance, normalize, toward } from '../core/vector';
import type { SeededRandom } from '../random/seededRandom';
import {
  blendWithFoodPheromone,
  depositFoodPheromone,
  foodPheromoneFollowProbability,
  foodPheromoneInfluence,
  sampleFoodPheromoneSignal
} from './pheromoneSystem';
import type { Ant, Food, Nest, SimulationEvent, Vector2, WorldState } from '../world/worldTypes';

const perceptionRadius = 5;
const pickupRadius = 0.75;
const deliveryRadius = 1.2;
const knownFoodArrivalRadius = 1.4;
const antSpeed = 0.34;
const directionNoise = 0.55;
const pheromoneDirectionNoise = 0.07;
const returnTrailSecondaryDepositMultiplier = 0.65;
const maxFoodMemoryFailures = 3;
const separationRadius = 0.55;
const separationStrength = 0.18;
const maxEvents = 80;

const findNearestAvailableFood = (ant: Ant, foods: Food[]): Food | undefined => {
  let nearest: Food | undefined;
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const food of foods) {
    if (food.amount <= 0) {
      continue;
    }
    const currentDistance = distance(ant.position, food.position);
    if (currentDistance <= perceptionRadius && currentDistance < nearestDistance) {
      nearest = food;
      nearestDistance = currentDistance;
    }
  }

  return nearest;
};

const findRememberedFood = (ant: Ant, foods: Food[]): Food | undefined => {
  if (!ant.knownFoodSourceId) {
    return undefined;
  }

  return foods.find((food) => food.id === ant.knownFoodSourceId && food.amount > 0);
};

const pushEvent = (world: WorldState, event: SimulationEvent): void => {
  world.events = [...world.events, event].slice(-maxEvents);
};

const clearFoodMemory = (ant: Ant): void => {
  ant.knownFoodSourceId = undefined;
  ant.knownFoodSourcePosition = undefined;
  ant.knownFoodSourceAmountSeen = undefined;
  ant.failedFoodMemoryTicks = 0;
};

const rememberFoodSource = (ant: Ant, food: Food, world: WorldState): void => {
  ant.knownFoodSourceId = food.id;
  ant.knownFoodSourcePosition = food.position;
  ant.knownFoodSourceAmountSeen = food.amount;
  ant.lastFoodSuccessTick = world.tick;
  ant.failedFoodMemoryTicks = 0;
};

const turnRandomly = (ant: Ant, random: SeededRandom): void => {
  ant.direction = normalize({
    x: ant.direction.x + random.nextSigned() * directionNoise,
    z: ant.direction.z + random.nextSigned() * directionNoise
  });
};

const deterministicSeparationDirection = (ant: Ant): Vector2 => {
  const numericId = [...ant.id].reduce((total, character) => total + character.charCodeAt(0), 0);
  return normalize({
    x: (numericId % 7) - 3,
    z: (numericId % 11) - 5
  });
};

const applyLocalSeparation = (ant: Ant, world: WorldState): void => {
  let pushX = 0;
  let pushZ = 0;

  for (const otherAnt of world.ants) {
    if (otherAnt.id === ant.id) {
      continue;
    }

    const currentDistance = distance(ant.position, otherAnt.position);
    if (currentDistance >= separationRadius) {
      continue;
    }

    const separationDirection = currentDistance === 0 ? deterministicSeparationDirection(ant) : toward(otherAnt.position, ant.position);
    const separationWeight = (separationRadius - currentDistance) / separationRadius;
    pushX += separationDirection.x * separationWeight;
    pushZ += separationDirection.z * separationWeight;
  }

  if (pushX === 0 && pushZ === 0) {
    return;
  }

  const separationDirection = normalize({ x: pushX, z: pushZ });
  ant.position = clampToBounds(
    {
      x: ant.position.x + separationDirection.x * separationStrength,
      z: ant.position.z + separationDirection.z * separationStrength
    },
    world.bounds
  );
};

const moveAnt = (ant: Ant, world: WorldState): void => {
  ant.position = clampToBounds(
    {
      x: ant.position.x + ant.direction.x * antSpeed,
      z: ant.position.z + ant.direction.z * antSpeed
    },
    world.bounds
  );

  const atHorizontalBorder = ant.position.x === world.bounds.minX || ant.position.x === world.bounds.maxX;
  const atVerticalBorder = ant.position.z === world.bounds.minZ || ant.position.z === world.bounds.maxZ;

  if (atHorizontalBorder || atVerticalBorder) {
    ant.direction = normalize({
      x: atHorizontalBorder ? -ant.direction.x : ant.direction.x,
      z: atVerticalBorder ? -ant.direction.z : ant.direction.z
    });
  }

  applyLocalSeparation(ant, world);
};

const updateInternalState = (ant: Ant, world: WorldState): void => {
  ant.age += world.tickDuration;
  ant.hunger = Math.min(100, ant.hunger + 0.015 * world.tickDuration);
  ant.energy = Math.max(0, ant.energy - 0.01 * world.tickDuration);
};

const pickFood = (ant: Ant, food: Food, world: WorldState): void => {
  food.amount -= 1;
  ant.carryingFood = true;
  ant.state = 'returningToNest';
  rememberFoodSource(ant, food, world);
  pushEvent(world, {
    tick: world.tick,
    type: 'food-picked',
    entityId: ant.id,
    message: `${ant.id} recogió comida de ${food.id}.`
  });
};

const followKnownFoodSource = (ant: Ant, world: WorldState): boolean => {
  if (!ant.knownFoodSourcePosition) {
    return false;
  }

  const rememberedFood = findRememberedFood(ant, world.foods);
  ant.state = 'seekingFood';
  ant.direction = toward(ant.position, ant.knownFoodSourcePosition);
  moveAnt(ant, world);

  if (rememberedFood && distance(ant.position, rememberedFood.position) <= pickupRadius) {
    pickFood(ant, rememberedFood, world);
    return true;
  }

  if (!rememberedFood && distance(ant.position, ant.knownFoodSourcePosition) <= knownFoodArrivalRadius) {
    ant.failedFoodMemoryTicks = (ant.failedFoodMemoryTicks ?? 0) + 1;
    if (ant.failedFoodMemoryTicks >= maxFoodMemoryFailures) {
      clearFoodMemory(ant);
    }
  }

  return true;
};

export const runAntBehaviorSystem = (world: WorldState, random: SeededRandom): void => {
  const nest: Nest | undefined = world.nests[0];
  if (!nest) {
    return;
  }

  for (const ant of world.ants) {
    updateInternalState(ant, world);

    if (ant.carryingFood) {
      const trailDirection = ant.knownFoodSourcePosition ? toward(ant.position, ant.knownFoodSourcePosition) : ant.direction;
      depositFoodPheromone(world, ant.position, world.foodPheromoneGrid.depositAmount, trailDirection);
      ant.state = 'returningToNest';
      ant.direction = toward(ant.position, nest.position);
      moveAnt(ant, world);
      const updatedTrailDirection = ant.knownFoodSourcePosition ? toward(ant.position, ant.knownFoodSourcePosition) : trailDirection;
      depositFoodPheromone(world, ant.position, world.foodPheromoneGrid.depositAmount * returnTrailSecondaryDepositMultiplier, updatedTrailDirection);

      if (distance(ant.position, nest.position) <= deliveryRadius) {
        ant.carryingFood = false;
        ant.state = 'exploring';
        ant.lastFoodSuccessTick = world.tick;
        nest.storedFood += 1;
        const colony = world.colonies.find((candidate) => candidate.id === ant.colonyId);
        if (colony) {
          colony.deliveredFood += 1;
        }
        pushEvent(world, {
          tick: world.tick,
          type: 'food-delivered',
          entityId: ant.id,
          message: `${ant.id} entregó comida al nido.`
        });
      }
      continue;
    }

    if (followKnownFoodSource(ant, world)) {
      continue;
    }

    const targetFood = findNearestAvailableFood(ant, world.foods);
    if (targetFood) {
      if (ant.state !== 'seekingFood') {
        pushEvent(world, {
          tick: world.tick,
          type: 'food-detected',
          entityId: ant.id,
          message: `${ant.id} detectó ${targetFood.id}.`
        });
      }
      ant.state = 'seekingFood';
      ant.direction = toward(ant.position, targetFood.position);
      moveAnt(ant, world);

      if (targetFood.amount > 0 && distance(ant.position, targetFood.position) <= pickupRadius) {
        pickFood(ant, targetFood, world);
      }
      continue;
    }

    ant.state = 'exploring';
    const foodPheromoneSignal = sampleFoodPheromoneSignal(world, ant.position);
    if (foodPheromoneSignal && random.next() < foodPheromoneFollowProbability(foodPheromoneSignal.intensity)) {
      const influence = foodPheromoneInfluence(foodPheromoneSignal.intensity);
      ant.direction = blendWithFoodPheromone(ant.direction, foodPheromoneSignal, influence);
      ant.direction = normalize({
        x: ant.direction.x + random.nextSigned() * pheromoneDirectionNoise,
        z: ant.direction.z + random.nextSigned() * pheromoneDirectionNoise
      });
    } else {
      turnRandomly(ant, random);
    }
    moveAnt(ant, world);
  }
};
