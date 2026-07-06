import type { WorldState } from '../world/worldTypes';

export const runStatisticsSystem = (world: WorldState): void => {
  const nestStoredFood = world.nests.reduce((total, nest) => total + nest.storedFood, 0);
  world.stats = {
    antCount: world.ants.length,
    foodSources: world.foods.filter((food) => food.amount > 0).length,
    totalFoodAmount: world.foods.reduce((total, food) => total + food.amount, 0),
    carriedFood: world.ants.filter((ant) => ant.carryingFood).length,
    nestStoredFood
  };
};
