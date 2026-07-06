export type SeededRandom = {
  readonly initialSeed: number;
  next: () => number;
  nextRange: (min: number, max: number) => number;
  nextSigned: () => number;
};

const normalizeSeed = (seed: number): number => {
  const normalized = seed >>> 0;
  return normalized === 0 ? 0x6d2b79f5 : normalized;
};

export const createSeededRandom = (seed: number): SeededRandom => {
  let state = normalizeSeed(seed);
  const initialSeed = state;

  const next = (): number => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };

  return {
    initialSeed,
    next,
    nextRange: (min, max) => min + (max - min) * next(),
    nextSigned: () => next() * 2 - 1
  };
};
