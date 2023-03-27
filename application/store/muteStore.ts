import { create } from "zustand";

export const useMuteStore = create<{
  mute: boolean;
  volume: number;
  setMute: (mute: boolean) => void;
  setVolume: (volume: number) => void;
}>()((set) => ({
  mute: true,
  volume: 0.5,
  setMute: (mute) => set({ mute }),
  setVolume: (volume) => set({ volume }),
}));
