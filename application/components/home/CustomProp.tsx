import styles from "./homeComponents.module.scss";
import classNames from "classnames/bind";
import { useAudioStore } from "@/store/audioStore";
import Image from "next/image";

const cx = classNames.bind(styles);
export function LpPlayer() {
  const { currentTrack, playing, setPlaying } = useAudioStore((state) => state);
  return (
    <div className={cx("LpPlayer")}>
      {currentTrack ? (
        <>
          <Image
            src={currentTrack.cover}
            alt={`Album cover of ${currentTrack.title}`}
            fill
          />
          <div
            className={cx("overlay")}
            onClick={() => {
              setPlaying(!playing);
            }}
          >
            {playing ? "일시 정지" : "재생"}
          </div>
        </>
      ) : (
        <div />
      )}
    </div>
  );
}
