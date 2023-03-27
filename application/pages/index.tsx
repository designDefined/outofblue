import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import Head from "next/head";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { useLayoutEffect, useRef, useState } from "react";
import sup_books_pc from "../public/assets/background/home_pc/sup_books_pc.png";
import sup_mailbox_pc from "../public/assets/background/home_pc/sup_mailbox_pc.png";
import sup_LP_pc from "../public/assets/background/home_pc/sup_LP_pc.png";

import sup_bookCover_pc from "public/assets/background/home_pc/sup_bookCover_pc.png";
import sup_cup_pc from "public/assets/background/home_pc/sup_cup_pc.png";
import sup_fire1_pc from "public/assets/background/home_pc/sup_fire1_pc.png";
import sup_fire2_pc from "public/assets/background/home_pc/sup_fire2_pc.png";
import sup_guitar_pc from "public/assets/background/home_pc/sup_guitar_pc.png";
import sup_incense_pc from "public/assets/background/home_pc/sup_incense_pc.png";
import sup_leaves_pc from "public/assets/background/home_pc/sup_leaves_pc.png";
import sup_smoke1_pc from "public/assets/background/home_pc/sup_smoke1_pc.png";
import sup_smoke2_pc from "public/assets/background/home_pc/sup_smoke2_pc.png";
import sup_woods_pc from "public/assets/background/home_pc/sup_woods_pc.png";

import sup_books_mobile from "public/assets/background/home_mobile/sup_books_mobile.png";
import sup_mailbox_mobile from "public/assets/background/home_mobile/sup_mailbox_mobile.png";
import sup_lp_mobile from "public/assets/background/home_mobile/sup_LP_mobile.png";
import sup_fire1_mobile from "public/assets/background/home_mobile/sup_fire1_mobile.png";
import sup_fire2_mobile from "public/assets/background/home_mobile/sup_fire2_mobile.png";
import sup_chair_mobile from "public/assets/background/home_mobile/sup_chair_mobile.png";
import sup_smoke1_mobile from "public/assets/background/home_mobile/sup_smoke1_mobile.png";
import sup_smoke2_mobile from "public/assets/background/home_mobile/sup_smoke2_mobile.png";
import sup_incense_mobile from "public/assets/background/home_mobile/sup_incense_mobile.png";
import sup_woods_mobile from "public/assets/background/home_mobile/sup_woods_mobile.png";

import RouteButton from "@/components/home/RouteButton";
import { getGuitarURL, getVideoURL } from "@/functions";
import { useVideoStore } from "@/store/videoStore";
import { useAudioStore } from "@/store/audioStore";
import { LpPlayer } from "@/components/home/CustomProp";
import Greeting from "@/components/home/Greeting";
import { useMuteStore } from "@/store/muteStore";
import ScrollHint from "@/components/home/ScrollHint";
import { useAmbienceStore } from "@/store/ambienceStore";
import { useAnimationStore } from "@/store/animationStore";

const cx = classNames.bind(styles);

type RouteData = {
  path: string;
  source: string | StaticImageData;
  drawRect: [number, number, number, number];
  zoomIn: [number, number];
};

const routes: RouteData[] = [
  {
    path: "mailbox",
    source: sup_mailbox_pc,
    drawRect: [0, 15, 9, 21.5],
    zoomIn: [25, 10],
  },
  {
    path: "books",
    source: sup_books_pc,
    drawRect: [42.5, 44, 12, 17],
    zoomIn: [0, -5],
  },
  /*
  {
    path: "books",
    source: sup_bookCover_pc,
    drawRect: [46.5, 54, 7, 9],
    zoomIn: [0, -5],
  },
     */
  {
    path: "lp",
    source: sup_LP_pc,
    drawRect: [69, 45, 10.5, 18],
    zoomIn: [-15, -5],
  },
];

const mobileRoutes: RouteData[] = [
  {
    path: "mailbox",
    source: sup_mailbox_mobile,
    drawRect: [-1, 3, 17, 13],
    zoomIn: [20, 15],
  },
  {
    path: "books",
    source: sup_books_mobile,
    drawRect: [80, 42, 20, 8],
    zoomIn: [-15, 0],
  },
  {
    path: "lp",
    source: sup_lp_mobile,
    drawRect: [56, 89, 40, 11],
    zoomIn: [-8, -22],
  },
];

export default function Home() {
  const router = useRouter();
  const [clickTv, setClickTv] = useState(false);
  const [incenseOn, setIncenseOn] = useState(true);
  const [transitionStyle, setTransitionStyle] = useState<
    { transform: string; opacity: number } | {}
  >({});
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioEffect, setAudioEffect] = useState<1 | 2 | 3 | 4>(1);
  const currentVideoName = useVideoStore((state) => state.currentVideoName);
  const currentAudio = useAudioStore((state) => state.currentTrack);
  const mute = useMuteStore((state) => state.mute);
  const volume = useMuteStore((state) => state.volume);
  const setAmbiencePlaying = useAmbienceStore((state) => state.setPlaying);
  const ambiencePlaying = useAmbienceStore((state) => state.playing);
  const animationStage = useAnimationStore((state) => state.stage);

  const startTransitionTo = (path: string, x: number, y: number) => {
    return () => {
      setTransitionStyle({
        transform: `scale(1.8) translate(${x}%,${y}%)`,
        opacity: 0,
      });
      setTimeout(() => router.push(`/${path}`), 1000);
    };
  };

  useLayoutEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume, videoRef]);

  return (
    <>
      <Head>
        <title>아웃 오브 블루 | Out Of Blue</title>
        <meta name="description" content="out of blue" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={cx("main")}>
        <div className={cx("content")} style={transitionStyle}>
          <div className={cx("tvViewport")}>
            <div
              className={cx("tv", animationStage, { clickTv })}
              onClick={() => {
                startTransitionTo("tv", 15, 0)();
              }}
              onMouseDown={() => {
                setClickTv(true);
              }}
              onMouseUp={() => {
                setClickTv(false);
              }}
            >
              {currentVideoName && (
                <video
                  ref={videoRef}
                  src={getVideoURL(currentVideoName, 480)}
                  muted
                  autoPlay
                  loop
                  playsInline
                />
              )}
              <div className={cx("clickHint")}>click!</div>
            </div>
          </div>
          <div className={cx("lpWrapper")}>
            <LpPlayer />
          </div>
          {/*******      *******/
          /***** PC Routes *****/
          /*******      *******/}
          {routes.map(({ source, path, drawRect, zoomIn }) => (
            <RouteButton
              key={path}
              source={source}
              drawRect={drawRect}
              callBackFunction={startTransitionTo(path, zoomIn[0], zoomIn[1])}
              isPc
            />
          ))}
          <RouteButton
            source={sup_woods_pc}
            drawRect={[15, 70, 8, 20]}
            callBackFunction={() => {
              setAmbiencePlaying(!ambiencePlaying);
            }}
            isPc
          />
          <RouteButton
            source={sup_guitar_pc}
            drawRect={[30, 49, 10, 36]}
            callBackFunction={() => {
              const guitarNum = (Math.floor(Math.random() * 4) + 1) as
                | 1
                | 2
                | 3
                | 4;
              audioRef.current?.pause();
              setAudioEffect(guitarNum);
              setTimeout(() => {
                audioRef.current?.play();
              }, 1);
            }}
            isPc
          />
          {ambiencePlaying && (
            <>
              <Image
                className={cx("prop", "pcOnly", "blink1")}
                src={sup_fire1_pc}
                alt="fire1"
                fill={true}
              />
              <Image
                className={cx("prop", "pcOnly", "blink2")}
                src={sup_fire2_pc}
                alt="fire2"
                fill={true}
              />
            </>
          )}
          <Image
            className={cx("prop", "pcOnly", "blink3")}
            src={sup_smoke1_pc}
            alt="smoke1"
            fill={true}
          />
          <Image
            className={cx("prop", "pcOnly", "blink4")}
            src={sup_smoke2_pc}
            alt="smoke2"
            fill={true}
          />
          <Image
            className={cx("prop", "pcOnly")}
            src={sup_cup_pc}
            alt="cup"
            fill={true}
          />
          <Image
            className={cx("prop", "pcOnly")}
            src={sup_bookCover_pc}
            alt="bookCover"
            fill={true}
          />
          {/**********      *********/
          /***** Mobile Routes ******/
          /**********      **********/}
          {mobileRoutes.map(({ source, path, drawRect, zoomIn }) => (
            <RouteButton
              key={path}
              source={source}
              drawRect={drawRect}
              callBackFunction={startTransitionTo(path, zoomIn[0], zoomIn[1])}
              isPc={false}
              className={path}
            />
          ))}
          <RouteButton
            className="guitar"
            source={sup_guitar_pc}
            drawRect={[16, 40, 20, 22]}
            callBackFunction={() => {
              const guitarNum = (Math.floor(Math.random() * 4) + 1) as
                | 1
                | 2
                | 3
                | 4;
              audioRef.current?.pause();
              setAudioEffect(guitarNum);
              setTimeout(() => {
                audioRef.current?.play();
              }, 1);
            }}
            isPc={false}
          />
          <audio ref={audioRef} src={getGuitarURL(audioEffect)} muted={mute} />
          <RouteButton
            className="incense"
            source={sup_incense_mobile}
            drawRect={[30, 10, 18, 8]}
            callBackFunction={() => {
              setIncenseOn(!incenseOn);
            }}
            isPc={false}
          />
          <RouteButton
            className="woods"
            source={sup_woods_mobile}
            drawRect={[43, 47, 22, 9]}
            callBackFunction={() => {
              setAmbiencePlaying(!ambiencePlaying);
            }}
            isPc={false}
          />
          {ambiencePlaying && (
            <>
              <Image
                className={cx("prop", "mobileOnly", "blink1")}
                src={sup_fire1_mobile}
                alt="fire"
                fill
              />
              <Image
                className={cx("prop", "mobileOnly", "blink2")}
                src={sup_fire2_mobile}
                alt="fire"
                fill
              />
            </>
          )}
          <Image
            className={cx("prop", "mobileOnly")}
            src={sup_chair_mobile}
            alt="chair"
            fill
          />
          {incenseOn && (
            <>
              <Image
                className={cx("prop", "mobileOnly", "blink3")}
                src={sup_smoke1_mobile}
                alt="incense smoke 1"
                fill
              />
              <Image
                className={cx("prop", "mobileOnly", "blink4")}
                src={sup_smoke2_mobile}
                alt="incense smoke 2"
                fill
              />
            </>
          )}
        </div>
        <Greeting />
      </main>
    </>
  );
}
