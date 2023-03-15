import { useEffect, useRef } from "react";
import { useAudioStore } from "@/store/audioStore";
import { getAudioURL } from "@/functions";

const AudioPlayer = () => {
  const ref = useRef<HTMLAudioElement>(null);
  const { setAudioRef, playing, currentTrack } = useAudioStore(
    (state) => state,
  );

  useEffect(() => {
    if (ref.current) {
      setAudioRef(ref.current);
    }
  }, []);

  useEffect(() => {
    if (playing) {
      if (ref.current) ref.current.play();
    } else {
      if (ref.current) ref.current.pause();
    }
  }, [currentTrack, playing]);

  return currentTrack ? (
    <audio ref={ref} src={getAudioURL(currentTrack.audioName)} loop />
  ) : (
    <audio ref={ref} />
  );
};
export default AudioPlayer;
