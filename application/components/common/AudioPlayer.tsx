import { useEffect, useRef } from "react";
import { useAudioStore } from "@/store/audioStore";
import { getAudioURL } from "@/functions";
import { useMuteStore } from "@/store/muteStore";

const AudioPlayer = () => {
  const ref = useRef<HTMLAudioElement>(null);
  const { setAudioRef, playing, currentTrack } = useAudioStore(
    (state) => state,
  );
  const mute = useMuteStore((state) => state.mute);

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
    <audio
      ref={ref}
      src={getAudioURL(currentTrack.audioName)}
      loop
      muted={mute}
    />
  ) : (
    <audio ref={ref} />
  );
};
export default AudioPlayer;
