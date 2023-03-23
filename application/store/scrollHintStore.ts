import { create } from "zustand";

export const useScrollHintStore = create((set) => ({
  get: false,
  set: (bool: boolean) => set({ get: bool }),
}));
