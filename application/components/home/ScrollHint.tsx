import styles from "./homeComponents.module.scss";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { useScrollHintStore } from "@/store/scrollHintStore";

const cx = classNames.bind(styles);
export default function ScrollHint() {
  // @ts-ignore
  const setScroll = useScrollHintStore((state) => state.set);
  useEffect(() => {
    setTimeout(() => {
      setScroll(true);
    }, 1500);
  }, []);

  return (
    <div className={cx("ScrollHint")}>
      <div className={cx("wrapper")}>
        <div className={cx("text")}>위 아래로</div>
        <div className={cx("text")}>Scroll!</div>
      </div>
      <img className={cx("scroll")} src="assets/icon/arrow_scroll_1.png" />
      <img
        className={cx("scroll", "mini")}
        src="assets/icon/arrow_scroll_2.png"
      />
    </div>
  );
}
