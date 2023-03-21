import styles from "./Lp.module.scss";
import classNames from "classnames/bind";
import { useLayoutEffect, useState } from "react";
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
    cover: cover_liebesKamel,
    title: "친애하는 낙타에게",
    subTitle: "Liebes Kamel, 2022",
    content:
      "'여름 내내 사랑을 감각했고 손을 잡았고 춤을 추었다 \n" +
      "존재했고 나눴고 웃었다\n" +
      ".\n" +
      ".\n" +
      "함께 춤을 추자 \n" +
      "사랑과 신비를 담아,'  \n" +
      "\n" +
      "알렉산더 테크닉 선생님들과 함께 작업한 " +
      "평안하고 따듯한 음악",
    links: {
      melon: "https://bit.ly/3wxa9dB",
      genie: "https://bit.ly/3AkRxie",
      bugs: "https://bit.ly/3PODlU4",
      flo: "https://bit.ly/3CyWpCX",
      vibe: "https://bit.ly/3wsVss3",
      apple: "https://apple.co/3AISjHc",
      youtube: "https://bit.ly/3TrSXQP",
    },
  },
  {
    id: 1,
    audioName: "ifNoLove",
    cover: cover_ifNoLove,
    title: "사랑이 없다면",
    subTitle: "If No Love 2022",
    content:
      "'사랑이 없다면 삶이 얼마나 평온하겠느냐 아드조. 조용하고, 안전하고, 지루하겠지.'" +
      "\n" +
      "- 움베르토 에코 <장미의 이름> 中 \n" +
      "\n" +
      "위태로운 사랑의 존재를 담은 에너제틱한 사랑노래",
    links: {
      melon: "https://bit.ly/3uIeSsk",
      genie: "https://bit.ly/3JHnXWH",
      bugs: "https://bit.ly/3EhIOid",
      flo: "https://bit.ly/3JHnYKf",
      vibe: "https://bit.ly/3KJv0zj",
      apple: "https://apple.co/3xuti1e",
      youtube: "https://bit.ly/3JDC3Za",
    },
  },
  {
    id: 2,
    audioName: "myPromise",
    cover: cover_myPromise,
    title: "나의 약속",
    subTitle: "My Promise 2022",
    content:
      "10살, 15살 아웃오브블루가 적어둔 일기를 모티브로 작업한 " +
      "자전적인 이야기\n" +
      "\n" +
      "‘사람들은 자기가 원하는 모습대로 살아가길 원하고, 아직 살아보지 않은 시간에 적어둔 나의 미래는 발자국이 한 번도 남겨지지 않은 설원처럼 아주 창창하고 팽팽하더라구요. 그걸 한 조각 마음에 품고 지금을 살아가면, 오늘의 발걸음이 조금은 더 힘차지 않을까. 뭐 그런 생각으로 장난스럽게 적어두었던 곡입니다. 1절은 초등학교 3학년 때의 일기이고, 2절은 중학교 2학년 때 그 일기장 뒷편에 적어두었던 저의 편지입니다.’",
    links: {
      melon: "https://bit.ly/3s9EUCl",
      genie: "https://bit.ly/3rm07K4",
      bugs: "https://bit.ly/3J3iOIL",
      flo: "https://bit.ly/3B17gCT",
      vibe: "https://bit.ly/3GhSysl",
      apple: "https://apple.co/3HoVlRP",
      youtube: "https://bit.ly/3glMJzj",
    },
  },
];

export default function Lp() {
  const currentTrack = useAudioStore((state) => state.currentTrack);
  const setCurrentTrack = useAudioStore((state) => state.setCurrentTrack);
  const playing = useAudioStore((state) => state.playing);
  const setPlaying = useAudioStore((state) => state.setPlaying);
  const setMute = useMuteStore((state) => state.setMute);
  const [displayLinkBubble, setDisplayLinkBubble] = useState(-1);
  const [displayBubble, setDisplayBubble] = useState(false);

  useLayoutEffect(() => {
    if (!currentTrack) setCurrentTrack(data[0]);
    if (window.innerWidth < 1024) setDisplayBubble(true);
  }, []);
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
                    <button
                      className={cx("playButton")}
                      onClick={() => {
                        setCurrentTrack(track);
                        setPlaying(true);
                        if (window.innerWidth >= 1024) setDisplayBubble(false);
                        setMute(false);
                      }}
                    >
                      {currentTrack?.audioName === track.audioName
                        ? " ▶"
                        : "1분 듣기"}
                    </button>
                    <button
                      onClick={() => {
                        //                        window.open(track.link);
                        displayLinkBubble === track.id
                          ? setDisplayLinkBubble(-1)
                          : setDisplayLinkBubble(track.id);
                      }}
                    >
                      FULL 음원 들으러 가기
                    </button>
                    {displayLinkBubble === track.id && (
                      <div className={cx("linkBubble")}>
                        <div className={cx("links")}>
                          <a
                            className={cx("link")}
                            href={track.links.melon}
                            target="_blank"
                            rel="noreferrer"
                          >
                            🎧 Melon
                          </a>
                          <a
                            className={cx("link")}
                            href={track.links.genie}
                            target="_blank"
                            rel="noreferrer"
                          >
                            🎧 Genie
                          </a>
                          <a
                            className={cx("link")}
                            href={track.links.bugs}
                            target="_blank"
                            rel="noreferrer"
                          >
                            🎧 Bugs
                          </a>
                          <a
                            className={cx("link")}
                            href={track.links.youtube}
                            target="_blank"
                            rel="noreferrer"
                          >
                            🎧 Youtube Music
                          </a>
                          <a
                            className={cx("link")}
                            href={track.links.apple}
                            target="_blank"
                            rel="noreferrer"
                          >
                            🎧 Apple Music
                          </a>
                          <a
                            className={cx("link")}
                            href={track.links.flo}
                            target="_blank"
                            rel="noreferrer"
                          >
                            🎧 FLO
                          </a>
                          <a
                            className={cx("link")}
                            href={track.links.vibe}
                            target="_blank"
                            rel="noreferrer"
                          >
                            🎧 VIBE
                          </a>
                        </div>
                      </div>
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
