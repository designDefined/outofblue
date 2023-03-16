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
import sup_fire1_mobile from "public/assets/background/home_mobile/sup_fire1_mobile.png";
import sup_chair_mobile from "public/assets/background/home_mobile/sup_chair_mobile.png";

import RouteButton from "@/components/home/RouteButton";
import { getVideoURL } from "@/functions";
import { useVideoStore } from "@/store/videoStore";
import { useAudioStore } from "@/store/audioStore";
import { LpPlayer } from "@/components/home/CustomProp";
import Greeting from "@/components/home/Greeting";
import { useMuteStore } from "@/store/muteStore";

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
    drawRect: [56, 79, 40, 21],
    zoomIn: [-8, -22],
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>아웃 오브 블루 | Out Of Blue</title>
        <meta name="description" content="out of blue" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={cx("main")}>
        <div>아웃오브블루의 홈페이지는 현재 작업 중입니다!</div>
        <div>~3 / 19 </div>
      </main>
    </>
  );
}
