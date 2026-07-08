import { create } from 'zustand';

export type PlaybackSpeed = 1 | 5 | 20 | 100;

export type ActiveTool = 'inspect' | 'place-food';

export type TerrainVisualPreset = 'lab-clear' | 'dry-sand' | 'dry-grass' | 'light-soil';

export type UiStore = {
  selectedEntityId: string | null;
  isPlaying: boolean;
  speed: PlaybackSpeed;
  activeTool: ActiveTool;
  terrainVisualPreset: TerrainVisualPreset;
  terrainVariation: number;
  showTerrainGrid: boolean;
  selectEntity: (id: string | null) => void;
  setPlaying: (isPlaying: boolean) => void;
  setSpeed: (speed: PlaybackSpeed) => void;
  setActiveTool: (tool: ActiveTool) => void;
  setTerrainVisualPreset: (preset: TerrainVisualPreset) => void;
  regenerateTerrainVisual: () => void;
  setShowTerrainGrid: (showGrid: boolean) => void;
};

export const useUiStore = create<UiStore>((set) => ({
  selectedEntityId: null,
  isPlaying: false,
  speed: 1,
  activeTool: 'inspect',
  terrainVisualPreset: 'lab-clear',
  terrainVariation: 0,
  showTerrainGrid: false,
  selectEntity: (selectedEntityId) => set({ selectedEntityId }),
  setPlaying: (isPlaying) => set({ isPlaying }),
  setSpeed: (speed) => set({ speed }),
  setActiveTool: (activeTool) => set({ activeTool }),
  setTerrainVisualPreset: (terrainVisualPreset) => set({ terrainVisualPreset }),
  regenerateTerrainVisual: () => set((state) => ({ terrainVariation: state.terrainVariation + 1 })),
  setShowTerrainGrid: (showTerrainGrid) => set({ showTerrainGrid })
}));
