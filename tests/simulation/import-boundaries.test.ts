import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const simulationRoot = join(process.cwd(), 'src', 'simulation');
const forbiddenImports = ['react', 'react-dom', 'three', '@react-three/fiber', '@react-three/drei', 'zustand'];

const collectSourceFiles = (directory: string): string[] =>
  readdirSync(directory).flatMap((entry: string) => {
    const fullPath = join(directory, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      return collectSourceFiles(fullPath);
    }
    return fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') ? [fullPath] : [];
  });

describe('fronteras de imports del núcleo de simulación', () => {
  it('no importa React, React DOM, Three.js, R3F, Drei ni Zustand desde src/simulation', () => {
    const violations = collectSourceFiles(simulationRoot).flatMap((filePath) => {
      const source = readFileSync(filePath, 'utf8');
      return forbiddenImports
        .filter((dependency) => source.includes(`from '${dependency}'`) || source.includes(`from "${dependency}"`))
        .map((dependency) => `${filePath} importa ${dependency}`);
    });

    expect(violations).toEqual([]);
  });

  it('no usa Math.random dentro de src/simulation', () => {
    const violations = collectSourceFiles(simulationRoot).filter((filePath) => readFileSync(filePath, 'utf8').includes('Math.random'));

    expect(violations).toEqual([]);
  });
});
