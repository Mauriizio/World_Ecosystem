import { distance, normalize } from '../core/vector';
import type { FoodPheromoneCell, FoodPheromoneSignal, Vector2, WorldState } from '../world/worldTypes';

const neighborhoodRadiusInCells = 2;
const signalDetectionRadius = 5.5;
const maxFoodPheromoneFollowProbability = 0.92;
const maxFoodPheromoneInfluence = 0.82;
const neutralTrailDirection: Vector2 = { x: 0, z: 0 };

const cellCoordinate = (value: number, cellSize: number): number => Math.floor(value / cellSize);

const cellKey = (x: number, z: number): string => `${x}:${z}`;

const cellCenter = (x: number, z: number, cellSize: number): Vector2 => ({
  x: x * cellSize + cellSize / 2,
  z: z * cellSize + cellSize / 2
});

const findCell = (world: WorldState, key: string): FoodPheromoneCell | undefined => world.foodPheromoneGrid.cells.find((cell) => cell.key === key);

const sortCells = (cells: FoodPheromoneCell[]): FoodPheromoneCell[] => [...cells].sort((left, right) => left.key.localeCompare(right.key));

const normalizeTrailDirection = (direction: Vector2): Vector2 => {
  if (direction.x === 0 && direction.z === 0) {
    return neutralTrailDirection;
  }

  return normalize(direction);
};

const blendTrailDirection = (currentDirection: Vector2, currentIntensity: number, depositedDirection: Vector2, depositedIntensity: number): Vector2 =>
  normalizeTrailDirection({
    x: currentDirection.x * currentIntensity + depositedDirection.x * depositedIntensity,
    z: currentDirection.z * currentIntensity + depositedDirection.z * depositedIntensity
  });

export const depositFoodPheromone = (world: WorldState, position: Vector2, intensity = world.foodPheromoneGrid.depositAmount, trailDirection: Vector2 = neutralTrailDirection): void => {
  const x = cellCoordinate(position.x, world.foodPheromoneGrid.cellSize);
  const z = cellCoordinate(position.z, world.foodPheromoneGrid.cellSize);
  const key = cellKey(x, z);
  const existingCell = findCell(world, key);
  const normalizedTrailDirection = normalizeTrailDirection(trailDirection);

  if (existingCell) {
    existingCell.trailDirection = blendTrailDirection(existingCell.trailDirection, existingCell.intensity, normalizedTrailDirection, intensity);
    existingCell.intensity = Math.min(world.foodPheromoneGrid.maxIntensity, existingCell.intensity + intensity);
  } else {
    world.foodPheromoneGrid.cells = sortCells([
      ...world.foodPheromoneGrid.cells,
      {
        key,
        center: cellCenter(x, z, world.foodPheromoneGrid.cellSize),
        intensity: Math.min(world.foodPheromoneGrid.maxIntensity, intensity),
        trailDirection: normalizedTrailDirection
      }
    ]);
  }

  world.foodPheromoneGrid.lastDepositTick = world.tick;
};

export const evaporateFoodPheromones = (world: WorldState): void => {
  world.foodPheromoneGrid.cells = sortCells(
    world.foodPheromoneGrid.cells
      .map((cell) => ({ ...cell, intensity: cell.intensity * world.foodPheromoneGrid.evaporationRate }))
      .filter((cell) => cell.intensity >= world.foodPheromoneGrid.minIntensity)
  );
};

export const sampleFoodPheromoneSignal = (world: WorldState, position: Vector2): FoodPheromoneSignal | undefined => {
  const originCellX = cellCoordinate(position.x, world.foodPheromoneGrid.cellSize);
  const originCellZ = cellCoordinate(position.z, world.foodPheromoneGrid.cellSize);
  let weightedDirectionX = 0;
  let weightedDirectionZ = 0;
  let totalIntensity = 0;

  for (let x = originCellX - neighborhoodRadiusInCells; x <= originCellX + neighborhoodRadiusInCells; x += 1) {
    for (let z = originCellZ - neighborhoodRadiusInCells; z <= originCellZ + neighborhoodRadiusInCells; z += 1) {
      const cell = findCell(world, cellKey(x, z));
      if (!cell || distance(position, cell.center) > signalDetectionRadius) {
        continue;
      }
      weightedDirectionX += cell.trailDirection.x * cell.intensity;
      weightedDirectionZ += cell.trailDirection.z * cell.intensity;
      totalIntensity += cell.intensity;
    }
  }

  if (totalIntensity <= 0) {
    return undefined;
  }

  if (weightedDirectionX === 0 && weightedDirectionZ === 0) {
    return undefined;
  }

  const direction = normalize({ x: weightedDirectionX, z: weightedDirectionZ });

  return {
    direction,
    intensity: totalIntensity
  };
};

export const foodPheromoneFollowProbability = (signalIntensity: number): number => Math.min(maxFoodPheromoneFollowProbability, 0.28 + signalIntensity / 7);

export const foodPheromoneInfluence = (signalIntensity: number): number => Math.min(maxFoodPheromoneInfluence, 0.32 + signalIntensity / 10);

export const blendWithFoodPheromone = (currentDirection: Vector2, signal: FoodPheromoneSignal, strength: number): Vector2 =>
  normalize({
    x: currentDirection.x * (1 - strength) + signal.direction.x * strength,
    z: currentDirection.z * (1 - strength) + signal.direction.z * strength
  });

export const runPheromoneSystem = (world: WorldState): void => {
  evaporateFoodPheromones(world);
};
