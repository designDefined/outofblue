import { create } from "zustand";

export const useAnimationStore = create<{
  stage: string;
  setStage: (stage: string) => void;
}>()((set) => ({
  stage: "initial",
  setStage: (stage) => set({ stage }),
}));
