import type { AntState } from '../../simulation';

export const antStateLabels: Record<AntState, string> = {
  exploring: 'explorando',
  seekingFood: 'buscando comida',
  returningToNest: 'regresando al nido'
};

export const booleanFoodLabels = {
  carrying: 'transportando comida',
  empty: 'sin carga'
} as const;
