import { clampToBounds, distance, normalize, toward } from '../core/vector';
import type { SeededRandom } from '../random/seededRandom';
import {
  blendWithFoodPheromone,
  depositFoodPheromone,
  foodPheromoneFollowProbability,
  foodPheromoneInfluence,
  sampleFoodPheromoneSignal
} from './pheromoneSystem';
import type { Ant, Food, Nest, SimulationEvent, WorldState } from '../world/worldTypes';

const perceptionRadius = 5;
const pickupRadius = 0.75;
const deliveryRadius = 1.2;
const antSpeed = 0.34;
const directionNoise = 0.55;
const pheromoneDirectionNoise = 0.07;
const returnTrailSecondaryDepositMultiplier = 0.65;
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

const pushEvent = (world: WorldState, event: SimulationEvent): void => {
  world.events = [...world.events, event].slice(-maxEvents);
};

const turnRandomly = (ant: Ant, random: SeededRandom): void => {
  ant.direction = normalize({
    x: ant.direction.x + random.nextSigned() * directionNoise,
    z: ant.direction.z + random.nextSigned() * directionNoise
  });
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
};

const updateInternalState = (ant: Ant, world: WorldState): void => {
  ant.age += world.tickDuration;
  ant.hunger = Math.min(100, ant.hunger + 0.015 * world.tickDuration);
  ant.energy = Math.max(0, ant.energy - 0.01 * world.tickDuration);
};

export const runAntBehaviorSystem = (world: WorldState, random: SeededRandom): void => {
  const nest: Nest | undefined = world.nests[0];
  if (!nest) {
    return;
  }

  for (const ant of world.ants) {
    updateInternalState(ant, world);

    if (ant.carryingFood) {
      depositFoodPheromone(world, ant.position);
      ant.state = 'returningToNest';
      ant.direction = toward(ant.position, nest.position);
      moveAnt(ant, world);
      depositFoodPheromone(world, ant.position, world.foodPheromoneGrid.depositAmount * returnTrailSecondaryDepositMultiplier);

      if (distance(ant.position, nest.position) <= deliveryRadius) {
        ant.carryingFood = false;
        ant.state = 'exploring';
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
        targetFood.amount -= 1;
        ant.carryingFood = true;
        ant.state = 'returningToNest';
        pushEvent(world, {
          tick: world.tick,
          type: 'food-picked',
          entityId: ant.id,
          message: `${ant.id} recogió comida de ${targetFood.id}.`
        });
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
