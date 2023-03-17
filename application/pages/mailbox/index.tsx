import styles from "./Mailbox.module.scss";
import classNames from "classnames/bind";
import { useLayoutEffect, useState } from "react";

const cx = classNames.bind(styles);
export default function Mailbox() {
  const [displayBubble, setDisplayBubble] = useState(false);
  useLayoutEffect(() => {
    if (window.innerWidth < 1024) setDisplayBubble(true);
  }, []);

  return (
    <main className={cx("main")}>
      <div className={cx("content")}>
        <div
          className={cx("mailboxWrapper")}
          onClick={() => {
            setDisplayBubble(true);
          }}
        />
      </div>
      {displayBubble && (
        <div
          className={cx("bubbleWrapper")}
          onClick={() => {
            setDisplayBubble(false);
          }}
        >
          <div
            className={cx("mailContainer")}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={cx("mailHint")}>This is the Post Box</div>
            <div className={cx("mailInputWrapper")}>
              하실 말씀이 있으시다면 이 곳에 남겨주세요! Please leave a message!
              <div className={cx("mailWarning")}>
                메일 보내기 기능은 아직 준비 중입니다
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
