import type { Vector2, WorldBounds } from '../world/worldTypes';

export const distance = (a: Vector2, b: Vector2): number => Math.hypot(a.x - b.x, a.z - b.z);

export const normalize = (vector: Vector2): Vector2 => {
  const length = Math.hypot(vector.x, vector.z);
  if (length === 0) {
    return { x: 1, z: 0 };
  }
  return { x: vector.x / length, z: vector.z / length };
};

export const toward = (from: Vector2, to: Vector2): Vector2 =>
  normalize({ x: to.x - from.x, z: to.z - from.z });

export const clampToBounds = (position: Vector2, bounds: WorldBounds): Vector2 => ({
  x: Math.min(bounds.maxX, Math.max(bounds.minX, position.x)),
  z: Math.min(bounds.maxZ, Math.max(bounds.minZ, position.z))
});
