import { useEffect, useRef } from "react";
import { useAmbienceStore } from "@/store/ambienceStore";
import { useMuteStore } from "@/store/muteStore";
import { getAudioURL } from "@/functions";

const AmbiencePlayer = () => {
  const ref = useRef<HTMLAudioElement>(null);
  const { setAudioRef, setPlaying, playing } = useAmbienceStore(
    (state) => state,
  );
  const mute = useMuteStore((state) => state.mute);
  const volume = useMuteStore((state) => state.volume);

  useEffect(() => {
    if (ref.current) {
      setAudioRef(ref.current);
    }
  }, []);
  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume, ref]);

  useEffect(() => {
    if (playing) {
      if (ref.current) ref.current.play();
    } else {
      if (ref.current) ref.current.pause();
    }
  }, [playing]);

  return (
    <audio
      ref={ref}
      src={getAudioURL("fireplace")}
      loop
      muted={mute}
      autoPlay
    />
  );
};

export default AmbiencePlayer;
