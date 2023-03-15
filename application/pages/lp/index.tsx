import styles from "./Lp.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import Image from "next/image";
import { TrackData, useAudioStore } from "@/store/audioStore";
import sup_lp from "public/assets/background/lp/sup_lp.png";
import cover_ifNoLove from "public/assets/background/lp/cover_ifNoLove.jpg";
import cover_myPromise from "public/assets/background/lp/cover_myPromise.jpg";
import cover_liebesKamel from "public/assets/background/lp/cover_liebesKamel.jpg";
import { useMuteStore } from "@/store/muteStore";

const cx = classNames.bind(styles);

const data: TrackData[] = [
  {
    id: 0,
    audioName: "liebesKamel",
    link: "https://youtu.be/JFgIHB67iXM",
    cover: cover_liebesKamel,
    title: "친애하는 낙타에게",
    subTitle: "Liebes Kamel, 2022",
    content:
      "‘여름 내내 사랑을 감각했고 손을 잡았고 춤을 추었다 \n" +
      "\n" +
      "존재했고 나눴고 웃었다\n" +
      "\n" +
      ".\n" +
      "\n" +
      ".\n" +
      "\n" +
      "함께 춤을 추자 \n" +
      "\n" +
      "사랑과 신비를 담아, ‘  \n" +
      "\n" +
      "알렉산더 테크닉 선생님들과 함께 작업한 \n" +
      "\n" +
      "평안하고 따듯한 음악",
  },
  {
    id: 1,
    audioName: "ifNoLove",
    link: "https://youtu.be/WliLXAyqpKs",
    cover: cover_ifNoLove,
    title: "사랑이 없다면",
    subTitle: "If No Love 2022",
    content:
      "'사랑이 없다면 삶이 얼마나 평온하겠느냐 아드조. 조용하고, 안전하고, 지루하겠지.'" +
      "\n" +
      "- 움베르토 에코 <장미의 이름> 中 \n" +
      "\n" +
      "위태로운 사랑의 존재를 담은 에너제틱한 사랑노래",
  },
  {
    id: 2,
    audioName: "myPromise",
    cover: cover_myPromise,
    title: "나의 약속",
    link: "https://youtu.be/sNlemNl4HZM",
    subTitle: "My Promise 2022",
    content:
      "10살, 15살 아웃오브블루가 적어둔 일기를 모티브로 작업한 \n" +
      "\n" +
      "자전적인 이야기\n" +
      "\n" +
      "‘사람들은 자기가 원하는 모습대로 살아가길 원하고, 아직 살아보지 않은 시간에 적어둔 나의 미래는 발자국이 한 번도 남겨지지 않은 설원처럼 아주 창창하고 팽팽하더라구요. 그걸 한 조각 마음에 품고 지금을 살아가면, 오늘의 발걸음이 조금은 더 힘차지 않을까. 뭐 그런 생각으로 장난스럽게 적어두었던 곡입니다. 1절은 초등학교 3학년 때의 일기이고, 2절은 중학교 2학년 때 그 일기장 뒷편에 적어두었던 저의 편지입니다.’",
  },
];

export default function Lp() {
  const currentTrack = useAudioStore((state) => state.currentTrack);
  const setCurrentTrack = useAudioStore((state) => state.setCurrentTrack);
  const playing = useAudioStore((state) => state.playing);
  const setPlaying = useAudioStore((state) => state.setPlaying);
  const setMute = useMuteStore((state) => state.setMute);

  const [displayBubble, setDisplayBubble] = useState(false);
  return (
    <main className={cx("main")}>
      <div className={cx("content")}>
        <div
          className={cx("lpWrapper")}
          onClick={() => {
            setDisplayBubble(true);
          }}
        >
          {currentTrack && (
            <Image
              src={currentTrack.cover}
              alt={`Album cover of ${currentTrack.title}`}
              fill={true}
              quality={30}
            />
          )}
        </div>
        {currentTrack && (
          <Image className={cx("prop")} src={sup_lp} alt={"flower"} fill />
        )}
      </div>
      {displayBubble && (
        <div
          className={cx("bubbleWrapper")}
          onClick={() => {
            setDisplayBubble(false);
          }}
        >
          <div
            className={cx("list")}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {data.map((track) => (
              <div key={track.id} className={cx("listItem")}>
                <div className={cx("coverWrapper")}>
                  <Image
                    src={track.cover}
                    alt={`Album cover of ${track.title}`}
                    quality={10}
                    fill
                  />
                  <div
                    className={cx("audioOverlay", {
                      on: currentTrack?.audioName === track.audioName,
                    })}
                  >
                    {currentTrack?.audioName === track.audioName ? (
                      <button
                        onClick={() => {
                          setPlaying(!playing);
                          setDisplayBubble(playing);
                        }}
                      >
                        {playing ? "일시 정지" : "다시 재생"}
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setCurrentTrack(track);
                            setPlaying(true);
                            setDisplayBubble(false);
                            setMute(false);
                          }}
                        >
                          재생
                        </button>
                        <button
                          onClick={() => {
                            window.open(track.link);
                          }}
                        >
                          링크
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className={cx("textWrapper")}>
                  <div className={cx("title")}>{track.title}</div>
                  <div className={cx("subTitle")}>{track.subTitle}</div>
                  <div className={cx("text")}>{track.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
