import { distance, normalize, toward } from '../core/vector';
import type { FoodPheromoneCell, FoodPheromoneSignal, Vector2, WorldState } from '../world/worldTypes';

const neighborhoodRadiusInCells = 1;
const signalDetectionRadius = 3.25;

const cellCoordinate = (value: number, cellSize: number): number => Math.floor(value / cellSize);

const cellKey = (x: number, z: number): string => `${x}:${z}`;

const cellCenter = (x: number, z: number, cellSize: number): Vector2 => ({
  x: x * cellSize + cellSize / 2,
  z: z * cellSize + cellSize / 2
});

const findCell = (world: WorldState, key: string): FoodPheromoneCell | undefined => world.foodPheromoneGrid.cells.find((cell) => cell.key === key);

const sortCells = (cells: FoodPheromoneCell[]): FoodPheromoneCell[] => [...cells].sort((left, right) => left.key.localeCompare(right.key));

export const depositFoodPheromone = (world: WorldState, position: Vector2, intensity = world.foodPheromoneGrid.depositAmount): void => {
  const x = cellCoordinate(position.x, world.foodPheromoneGrid.cellSize);
  const z = cellCoordinate(position.z, world.foodPheromoneGrid.cellSize);
  const key = cellKey(x, z);
  const existingCell = findCell(world, key);

  if (existingCell) {
    existingCell.intensity = Math.min(world.foodPheromoneGrid.maxIntensity, existingCell.intensity + intensity);
  } else {
    world.foodPheromoneGrid.cells = sortCells([
      ...world.foodPheromoneGrid.cells,
      {
        key,
        center: cellCenter(x, z, world.foodPheromoneGrid.cellSize),
        intensity: Math.min(world.foodPheromoneGrid.maxIntensity, intensity)
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
  let weightedX = 0;
  let weightedZ = 0;
  let totalIntensity = 0;

  for (let x = originCellX - neighborhoodRadiusInCells; x <= originCellX + neighborhoodRadiusInCells; x += 1) {
    for (let z = originCellZ - neighborhoodRadiusInCells; z <= originCellZ + neighborhoodRadiusInCells; z += 1) {
      const cell = findCell(world, cellKey(x, z));
      if (!cell || distance(position, cell.center) > signalDetectionRadius) {
        continue;
      }
      weightedX += cell.center.x * cell.intensity;
      weightedZ += cell.center.z * cell.intensity;
      totalIntensity += cell.intensity;
    }
  }

  if (totalIntensity <= 0) {
    return undefined;
  }

  return {
    direction: toward(position, { x: weightedX / totalIntensity, z: weightedZ / totalIntensity }),
    intensity: totalIntensity
  };
};

export const blendWithFoodPheromone = (currentDirection: Vector2, signal: FoodPheromoneSignal, strength: number): Vector2 =>
  normalize({
    x: currentDirection.x * (1 - strength) + signal.direction.x * strength,
    z: currentDirection.z * (1 - strength) + signal.direction.z * strength
  });

export const runPheromoneSystem = (world: WorldState): void => {
  evaporateFoodPheromones(world);
};
