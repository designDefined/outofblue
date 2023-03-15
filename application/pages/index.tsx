import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import Head from "next/head";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
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

import RouteButton from "@/components/home/RouteButton";
import { getVideoURL } from "@/functions";
import { useVideoStore } from "@/store/videoStore";
import { useAudioStore } from "@/store/audioStore";
import { LpPlayer } from "@/components/home/CustomProp";
import Greeting from "@/components/home/Greeting";

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
    drawRect: [0, 3, 17, 13],
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
    drawRect: [56, 79, 40, 21],
    zoomIn: [-8, -22],
  },
];

export default function Home() {
  const router = useRouter();
  const [clickTv, setClickTv] = useState(false);
  const [transitionStyle, setTransitionStyle] = useState<
    { transform: string; opacity: number } | {}
  >({});
  const currentVideoName = useVideoStore((state) => state.currentVideoName);

  const startTransitionTo = (path: string, x: number, y: number) => {
    return () => {
      setTransitionStyle({
        transform: `scale(1.8) translate(${x}%,${y}%)`,
        opacity: 0,
      });
      setTimeout(() => router.push(`/${path}`), 1000);
    };
  };

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
              className={cx("tv", { clickTv })}
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
                  src={getVideoURL(currentVideoName, 480)}
                  muted
                  autoPlay
                  loop
                />
              )}
            </div>
          </div>
          <div className={cx("lpWrapper")}>
            <LpPlayer />
          </div>
          {routes.map(({ source, path, drawRect, zoomIn }) => (
            <RouteButton
              key={path}
              source={source}
              drawRect={drawRect}
              callBackFunction={startTransitionTo(path, zoomIn[0], zoomIn[1])}
              isPc
            />
          ))}
          {mobileRoutes.map(({ source, path, drawRect, zoomIn }) => (
            <RouteButton
              key={path}
              source={source}
              drawRect={drawRect}
              callBackFunction={startTransitionTo(path, zoomIn[0], zoomIn[1])}
              isPc={false}
            />
          ))}
          <Image
            className={cx("prop", "pcOnly")}
            src={sup_cup_pc}
            alt="cup"
            fill={true}
          />
          <Image
            className={cx("prop", "pcOnly")}
            src={sup_bookCover_pc}
            alt="cup"
            fill={true}
          />
        </div>
        <Greeting />
      </main>
    </>
  );
}
