import { create } from "zustand";

export const useMuteStore = create<{
  mute: boolean;
  setMute: (mute: boolean) => void;
}>()((set) => ({
  mute: true,
  setMute: (mute) => set({ mute }),
}));
