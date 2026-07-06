import { create } from 'zustand';

export type PlaybackSpeed = 1 | 5 | 20 | 100;

export type ActiveTool = 'inspect' | 'place-food';

export type UiStore = {
  selectedEntityId: string | null;
  isPlaying: boolean;
  speed: PlaybackSpeed;
  activeTool: ActiveTool;
  selectEntity: (id: string | null) => void;
  setPlaying: (isPlaying: boolean) => void;
  setSpeed: (speed: PlaybackSpeed) => void;
  setActiveTool: (tool: ActiveTool) => void;
};

export const useUiStore = create<UiStore>((set) => ({
  selectedEntityId: null,
  isPlaying: false,
  speed: 1,
  activeTool: 'inspect',
  selectEntity: (selectedEntityId) => set({ selectedEntityId }),
  setPlaying: (isPlaying) => set({ isPlaying }),
  setSpeed: (speed) => set({ speed }),
  setActiveTool: (activeTool) => set({ activeTool })
}));
