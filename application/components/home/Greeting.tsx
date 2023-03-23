import styles from "./homeComponents.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import arrow1 from "public/assets/greet/arrow1.png";
import arrow2 from "public/assets/greet/arrow1.png";
import ScrollHint from "@/components/home/ScrollHint";

const greetingTitle = "아웃오브블루의 공간 ‘The Blue Room’";
const greetingData = [
  "안녕하세요, 아웃오브블루의 공간 ‘The Blue Room’에 오신 것을 환영합니다.\n" +
    "\n" +
    "공간 구석구석에는 아웃오브블루의 글, 음악, 영상, 사진 등의 창작물 그리고 굿즈들이 배치되어 있습니다. 원하시는 걸 마음껏 클릭해보세요!\n" +
    "\n" +
    "때로는 소리가 날 수 있으니, 환경에 따라 이어폰 사용 혹은 볼륨 조절을 통해 곤란한 일을 방지하시길 미리 말씀드려요!\n" +
    "\n" +
    "우선 제가 좋아하는 인센스와 벽난로를 켜두어 보았는데, 마음에 드시면 좋겠네요. 하하\n" +
    "더우시면 언제든 끄셔도 좋아요. 한 번 클릭으로 끌 수 있어요.\n" +
    "\n" +
    "아무쪼록 어떻게 여기까지 찾아오셨는지 모르겠지만\n" +
    "오신김에 편히 구경하시고, 놀다 가셔요!\n" +
    "\n" +
    "아, 가시기 전에 하실 말씀이 있으시다면\n" +
    "POST BOX에 쪽지 넣어주세요\n" +
    "차차 확인하고 연락드릴게요!\n" +
    "\n" +
    "그럼 이만.",
];

const greetingMobile = [
  "안녕하세요,\n 아웃오브블루의 공간\n ‘The Blue Room’에 오신 것을 환영합니다.",
  "공간 구석구석에는 아웃오브블루의\n 글, 음악, 영상, 사진 등의 창작물 그리고 굿즈들이 배치되어 있습니다.\n 원하시는 걸 마음껏 클릭해보세요!",
  "때로는 소리가 날 수 있으니,\n 환경에 따라 이어폰 사용 혹은 볼륨 조절을 통해 곤란한 일을 방지하시길 미리 말씀드려요!",
  "우선\n 제가 좋아하는 인센스와 벽난로를 켜두어 보았는데,\n 마음에 드시면 좋겠네요. 하하\n",
  "더우시면 언제든 끄셔도 좋아요.\n 한 번 클릭으로 끌 수 있어요.",
  "아무쪼록 어떻게 여기까지 찾아오셨는지 모르겠지만\n 오신김에 편히 구경하시고,\n 놀다 가셔요!",
  "아, 가시기 전에 하실 말씀이 있으시다면 POST BOX에 쪽지 넣어주세요.\n" +
    "차차 확인하고 연락드릴게요!\n",
  "그럼 이만.",
];

const cx = classNames.bind(styles);
export default function Greeting() {
  const [open, setOpen] = useState(true);
  const [scrollHint, setScrollHint] = useState(false);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const session = sessionStorage.getItem("greeting");
    if (!(session && JSON.parse(session))) {
      setOpen(true);
    }
  }, []);
  useEffect(() => {
    if (scrollHint) {
      window.setTimeout(() => {
        setOpen(false);
        sessionStorage.setItem("greeting", JSON.stringify(true));
      }, 3150);
    }
  }, [scrollHint]);
  return (
    <div
      className={cx("Greeting", { open, scrollHint })}
      onScroll={(e) => e.stopPropagation()}
    >
      <div className={cx("container", "pcOnly")}>
        <div className={cx("title")}>{greetingTitle}</div>
        <div className={cx("text")}>{greetingData[0]}</div>
        <div
          className={cx("close")}
          onClick={() => {
            setOpen(false);
            sessionStorage.setItem("greeting", JSON.stringify(true));
          }}
        >
          닫기
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
                <img src={"assets/icon/arrow_left.png"} />
                이전
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
                  다음 <img src="assets/icon/arrow_right.png" />
                </button>
              )}
            </div>
          }
        </div>
      )}
    </div>
  );
}
