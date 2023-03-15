import styles from "./MenuBar.module.scss";
import classNames from "classnames/bind";
import { useRouter } from "next/router";
import Image from "next/image";
import icon_home from "public/assets/icon/home.svg";
import icon_mute from "public/assets/icon/mute.svg";
import icon_unmute from "public/assets/icon/unmute.svg";
import { useMuteStore } from "@/store/muteStore";

const cx = classNames.bind(styles);
export default function MenuBar() {
  const router = useRouter();
  const mute = useMuteStore((state) => state.mute);
  const setMute = useMuteStore((state) => state.setMute);

  return (
    <div className={cx("MenuBar")}>
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        <Image src={icon_home} alt={"home icon"} fill />
      </button>

      <button>
        {mute ? (
          <Image
            src={icon_mute}
            alt={"volume icon"}
            fill
            onClick={() => {
              setMute(false);
            }}
          />
        ) : (
          <Image
            src={icon_unmute}
            alt={"volume icon"}
            fill
            onClick={() => {
              setMute(true);
            }}
          />
        )}
      </button>
    </div>
  );
}
