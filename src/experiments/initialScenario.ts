import { createSimulation } from '../simulation';

export const initialExperimentSeed = 20260706;

export const createInitialExperiment = () =>
  createSimulation({
    seed: initialExperimentSeed,
    antCount: 20
  });
