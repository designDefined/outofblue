import { create } from "zustand";

type VideoStore = {
  currentVideoName: null | string;
  setCurrentVideoName: (name: string) => void;
};

export const useVideoStore = create<VideoStore>()((set) => ({
  currentVideoName: null,
  setCurrentVideoName: (name) => set({ currentVideoName: name }),
}));
