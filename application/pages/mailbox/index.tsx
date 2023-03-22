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
        >
          <div className={cx("clickHint")}>click!</div>
        </div>
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
            <div className={cx("mailHint")}>"Hi! I'm the Post Box"</div>
            <div className={cx("mailInputWrapper")}>
              하실 말씀이 있으시다면 이 곳에 남겨주세요! Please leave a message!
            </div>
            <button className={cx("sendButton")}>보내기</button>
            <div className={cx("mailWarning")}>
              쪽지 보내기 기능은 <br />
              <br />
              아직 준비 중입니다!
              <br />
              <br />
              :)
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
