import styles from "./homeComponents.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import arrow1 from "public/assets/greet/arrow1.png";
import arrow2 from "public/assets/greet/arrow1.png";
import ScrollHint from "@/components/home/ScrollHint";
import { useAnimationStore } from "@/store/animationStore";

const greetingTitle = "The Blue Room";
const greetingData = [
  "안녕하세요, 아웃오브블루의 공간 ‘The Blue Room’에 오신 것을 환영합니다." +
    "\n공간 구석구석에는 아웃오브블루의 창작물들이 배치되어 있습니다. \n원하시는 걸 마음껏 'click' 해보세요!\n" +
    "\n" +
    "때로는 소리가 날 수 있으니,\n환경에 따라 이어폰 사용 혹은 볼륨 조절을 통해 곤란한 일을 방지하시길..!\n",
  "우선 제가 좋아하는 인센스와 벽난로를 켜두었는데, \n더우시면 언제든 끄셔도 좋아요. 하하" +
    "\n한 번 'click' 으로 끌 수 있어요!" +
    "\n\n편히 구경하시고, 놀다 가셔요!\n" +
    "\n" +
    "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0- outofblue -",
];

const a = [
  "아, 가시기 전에 하실 말씀이 있으시다면\n" +
    "POST BOX에 쪽지 넣어주세요\n" +
    "차차 확인하고 연락드릴게요!\n" +
    "\n" +
    "그럼 이만.",
];

const greetingMobile = [
  "안녕하세요,\n 아웃오브블루의 공간\n ‘The Blue Room’에 오신 것을 환영합니다.",
  "공간 구석구석에는\n아웃오브블루의 창작물들이\n배치되어 있습니다.\n\n 원하시는 걸 'click' 해보세요!",
  "때로는 소리가 날 수 있으니,\n 환경에 따라 이어폰 사용\n 혹은 볼륨 조절을 통해\n 곤란한 일을 미리 방지하시길!",
  "우선 제가 좋아하는 인센스와\n 벽난로를 켜두었는데,\n 더우시면 언제든 끄셔도 좋아요.\n하하.",
  "편히 구경하시고,\n 놀다 가셔요!",
];

const cx = classNames.bind(styles);
export default function Greeting() {
  const [open, setOpen] = useState(false);
  const [scrollHint, setScrollHint] = useState(false);
  const [page, setPage] = useState(0);
  const setStage = useAnimationStore((state) => state.setStage);
  useEffect(() => {
    const session = sessionStorage.getItem("greeting");
    if (!(session && JSON.parse(session))) {
      setOpen(true);
      setStage("wait");
    } else {
      setStage("loop");
    }
  }, []);
  useEffect(() => {
    if (scrollHint) {
      window.setTimeout(() => {
        setStage("click");
      }, 2150);
      window.setTimeout(() => {
        setOpen(false);
        sessionStorage.setItem("greeting", JSON.stringify(true));
      }, 3150);
      window.setTimeout(() => {
        setStage("loop");
      }, 6150);
    }
  }, [scrollHint]);
  return (
    <div
      className={cx("Greeting", { open, scrollHint })}
      onScroll={(e) => e.stopPropagation()}
    >
      <div className={cx("container", "pcOnly")}>
        <div className={cx("title")}>{greetingTitle}</div>
        <div className={cx("text")}>{greetingData[1]}</div>
        <div
          className={cx("close")}
          onClick={() => {
            setOpen(false);
            sessionStorage.setItem("greeting", JSON.stringify(true));
          }}
        >
          <img src="assets/icon/close_700.svg" />
        </div>
      </div>
      {scrollHint ? (
        <ScrollHint />
      ) : (
        <div className={cx("container", "mobileOnly")}>
          {page === 2 && (
            <img className={cx("arrow1")} src="assets/greet/arrow1.png" />
          )}
          {page === 3 && (
            <img className={cx("arrow2")} src="assets/greet/arrow1.png" />
          )}
          {page === 6 && (
            <img className={cx("arrow3")} src="assets/greet/arrow1.png" />
          )}
          {<div className={cx("text")}>{greetingMobile[page]}</div>}
          {
            <div className={cx("buttons")}>
              <button
                className={cx("button", { invisible: page === 0 })}
                onClick={() => setPage(page - 1)}
              >
                <img src={"assets/icon/arrow_left.svg"} />
              </button>
              {page === greetingMobile.length - 1 ? (
                <div
                  className={cx("button")}
                  onClick={() => {
                    setPage(0);
                    setScrollHint(true);
                  }}
                >
                  닫기
                </div>
              ) : (
                <button
                  className={cx("button")}
                  onClick={() => setPage(page + 1)}
                >
                  <img src="assets/icon/arrow_right.svg" />
                </button>
              )}
            </div>
          }
        </div>
      )}
    </div>
  );
}
