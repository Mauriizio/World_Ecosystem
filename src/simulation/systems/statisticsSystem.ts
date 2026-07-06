import type { WorldState } from '../world/worldTypes';

export const runStatisticsSystem = (world: WorldState): void => {
  const nestStoredFood = world.nests.reduce((total, nest) => total + nest.storedFood, 0);
  const foodPheromoneTotalIntensity = world.foodPheromoneGrid.cells.reduce((total, cell) => total + cell.intensity, 0);
  const foodPheromoneMaxIntensity = world.foodPheromoneGrid.cells.reduce((maximum, cell) => Math.max(maximum, cell.intensity), 0);
  world.stats = {
    antCount: world.ants.length,
    foodSources: world.foods.filter((food) => food.amount > 0).length,
    totalFoodAmount: world.foods.reduce((total, food) => total + food.amount, 0),
    carriedFood: world.ants.filter((ant) => ant.carryingFood).length,
    nestStoredFood,
    foodPheromoneTotalIntensity,
    foodPheromoneActiveCells: world.foodPheromoneGrid.cells.length,
    foodPheromoneMaxIntensity,
    foodPheromoneLastDepositTick: world.foodPheromoneGrid.lastDepositTick
  };
};
