import { create } from "zustand";

type AmbienceStore = {
  audioRef: HTMLAudioElement | null;
  playing: boolean;
  setAudioRef: (element: HTMLAudioElement) => void;
  setPlaying: (bool: boolean) => void;
};

export const useAmbienceStore = create<AmbienceStore>()((set) => ({
  audioRef: null,
  playing: true,
  setAudioRef: (element) => set({ audioRef: element }),
  setPlaying: (bool) => set({ playing: bool }),
}));
