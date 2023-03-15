import styles from "./Mailbox.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
export default function Mailbox() {
  return (
    <main className={cx("main")}>
      <div className={cx("content")}></div>
    </main>
  );
}
