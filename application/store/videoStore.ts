import { create } from "zustand";

type VideoStore = {
  currentVideoName: string;
  setCurrentVideoName: (name: string) => void;
};

export const useVideoStore = create<VideoStore>()((set) => ({
  currentVideoName: "liebesKamel",
  setCurrentVideoName: (name) => set({ currentVideoName: name }),
}));
