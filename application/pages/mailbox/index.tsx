import styles from "./Mailbox.module.scss";
import classNames from "classnames/bind";
import { useLayoutEffect, useState } from "react";

const cx = classNames.bind(styles);
export default function Mailbox() {
  const [displayBubble, setDisplayBubble] = useState(window.innerWidth < 1024);

  return (
    <main className={cx("main")}>
      <div className={cx("content")}></div>
    </main>
  );
}
