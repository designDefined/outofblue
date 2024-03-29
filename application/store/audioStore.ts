import { create } from "zustand";
import { useRef } from "react";
import { StaticImageData } from "next/image";

export type TrackData = {
  id: number;
  audioName: string;
  cover: StaticImageData;
  title: string;
  subTitle: string;
  content: string;
  links: {
    melon: string;
    genie: string;
    bugs: string;
    flo: string;
    vibe: string;
    apple: string;
    youtube: string;
  };
};

type AudioStore = {
  audioRef: HTMLAudioElement | null;
  currentTrack: TrackData | null;
  playing: boolean;
  setAudioRef: (element: HTMLAudioElement) => void;
  setCurrentTrack: (track: TrackData) => void;
  setPlaying: (bool: boolean) => void;
};

export const useAudioStore = create<AudioStore>()((set) => ({
  audioRef: null,
  currentTrack: null,
  playing: false,
  setAudioRef: (element) => set({ audioRef: element }),
  setCurrentTrack: (track) =>
    set({
      currentTrack: track,
    }),
  setPlaying: (bool) => set({ playing: bool }),
}));
