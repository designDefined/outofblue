import styles from "./Tv.module.scss";
import classNames from "classnames/bind";
import { getVideoURL } from "@/functions";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import sup_flower from "public/assets/background/tv/sup_flower.png";
import { useVideoStore } from "@/store/videoStore";
import { useMuteStore } from "@/store/muteStore";
import { useAudioStore } from "@/store/audioStore";

const cx = classNames.bind(styles);

const videoNames: string[] = ["liebesKamel", "ifNoLove", "myPromise"];

const data: {
  id: number;
  videoName: string;
  link: string;
  title: string;
  subTitle: string;
  content: string;
  credit: string;
}[] = [
  {
    id: 0,
    videoName: "liebesKamel",
    link: "https://youtu.be/JFgIHB67iXM",
    title: "친애하는 낙타에게",
    subTitle: " Official M/V (2022)",
    content: "푸르른 신비의 공간 속에서 벌어지는 신비로운 만남, 그리고 춤",
    credit:
      "연출 아웃오브블루(Out of Blue)\n" +
      "\n" +
      "제작 엔터타인 (Enter:Ta-In Film Crew)\n" +
      "\n" +
      "출연 안소담 김환이 이보미 박혜영 아웃오브블루",
  },
  {
    id: 1,
    videoName: "ifNoLove",
    link: "https://youtu.be/WliLXAyqpKs",
    title: "사랑이 없다면",
    subTitle: " Official M/V (2022)",
    content: "위태로운 사랑의 존재 앞에 서 있는 청춘들의 이야기",
    credit:
      "연출 서울빌 (Seoul Vill)\n" +
      "\n" +
      "제작 장환공, 아웃오브블루\n" +
      "\n" +
      "출연 도다혜 오도근 김재은 남국현 박진현",
  },
  {
    id: 2,
    videoName: "myPromise",
    title: "나의 약속",
    link: "https://youtu.be/sNlemNl4HZM",
    subTitle: " Official M/V (2022)",
    content: "아웃오브블루의 자전적 이야기를 담은 홈비디오 여행",
    credit:
      "연출 아웃오브블루(Out of Blue)\n" +
      "\n" +
      "제작 엔터타인 (Enter:Ta-In Film Crew)\n" +
      "\n" +
      "출연 아웃오브블루",
  },
];

export default function Tv() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const globalMute = useMuteStore((state) => state.mute);
  const [muted, setMuted] = useState(true);
  const { currentVideoName, setCurrentVideoName } = useVideoStore(
    (state) => state,
  );
  const [displayBubble, setDisplayBubble] = useState(false);
  const setAudioPlaying = useAudioStore((state) => state.setPlaying);

  useLayoutEffect(() => {
    if (!currentVideoName) setCurrentVideoName("liebesKamel");
    if (window.innerWidth < 1024) setDisplayBubble(true);
  }, []);

  return (
    <main className={cx("main")}>
      <div className={cx("content")}>
        <div
          className={cx("tvWrapper")}
          onClick={() => {
            setDisplayBubble(true);
            videoRef.current?.pause();
          }}
        >
          {currentVideoName && (
            <video
              ref={videoRef}
              src={getVideoURL(currentVideoName, 1920)}
              muted={muted || globalMute}
              autoPlay
              loop
              playsInline
            />
          )}
        </div>
        <Image className={cx("prop")} src={sup_flower} alt={"lp"} />
      </div>
      {displayBubble && (
        <div className={cx("bubbleWrapper")}>
          <div className={cx("list")}>
            {data.map(
              ({ id, videoName, subTitle, title, credit, content, link }) => (
                <div key={id} className={cx("listItem")}>
                  <div className={cx("videoWrapper")}>
                    <video
                      className={cx("thumbnail")}
                      src={getVideoURL(videoName, 480)}
                      muted
                      autoPlay
                      loop
                    />
                    <div
                      className={cx("videoOverlay", {
                        on: currentVideoName === videoName,
                      })}
                    >
                      <button
                        onClick={() => {
                          setCurrentVideoName(videoName);
                          setMuted(false);
                          setAudioPlaying(false);
                          if (window.innerWidth >= 1024)
                            setDisplayBubble(false);
                          //videoRef.current?.play();
                        }}
                      >
                        Tv로 클립 보기
                      </button>
                      <button
                        onClick={() => {
                          window.open(link);
                        }}
                      >
                        FULL 영상 보러가기
                      </button>
                    </div>
                  </div>
                  <div className={cx("textWrapper")}>
                    <div className={cx("title")}>{title}</div>
                    <div className={cx("subTitle")}>{subTitle}</div>
                    <div className={cx("text")}>{content}</div>
                    <div className={cx("creditLabel")}>- credit -</div>
                    <div className={cx("credit")}>{credit}</div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </main>
  );
}
