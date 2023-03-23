import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import styles from "./homeComponents.module.scss";
import classNames from "classnames/bind";
import { useScrollHintStore } from "@/store/scrollHintStore";

const cx = classNames.bind(styles);

type Props = {
  source: string | StaticImageData;
  drawRect: [number, number, number, number];
  callBackFunction: () => void;
  isPc: boolean;
  className?: string;
};

export default function RouteButton({
  source,
  drawRect,
  callBackFunction,
  isPc,
  className,
}: Props) {
  const [left, top, width, height] = drawRect.map((num) => `${num}%`);
  const [buttonState, setButtonState] = useState({
    hovered: false,
    pressed: false,
  });
  // @ts-ignore
  const isScrollEnded = useScrollHintStore((state) => state.get);

  return (
    <>
      <Image
        className={cx("prop", buttonState, {
          pcOnly: isPc,
          mobileOnly: !isPc,
          startAnim: isScrollEnded,
          [className ?? "noClass"]: className !== undefined,
        })}
        src={source}
        alt={`routing button`}
        fill={true}
      />
      <div
        className={cx("routeButton", {
          pcOnly: isPc,
          mobileOnly: !isPc,
          startAnim: isScrollEnded,
        })}
        style={{ left: left, top, width, height }}
        onMouseEnter={() => {
          setButtonState({ ...buttonState, hovered: true });
        }}
        onMouseLeave={() => {
          setButtonState({ pressed: false, hovered: false });
        }}
        onMouseDown={() => {
          setButtonState({ ...buttonState, pressed: true });
        }}
        onMouseUp={() => {
          setButtonState({ ...buttonState, pressed: false });
        }}
        onClick={() => {
          callBackFunction();
        }}
      >
        {!isPc && <div className={cx("mobileClick")}>click!</div>}
        {isPc && <div className={cx("pcClick")}>click!</div>}
      </div>
    </>
  );
}
