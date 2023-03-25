import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import styles from "./homeComponents.module.scss";
import classNames from "classnames/bind";
import { useAnimationStore } from "@/store/animationStore";

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
  const stage = useAnimationStore((state) => state.stage);

  return (
    <>
      <Image
        className={cx("prop", stage, buttonState, {
          pcOnly: isPc,
          mobileOnly: !isPc,
          [className ?? "noClass"]: className !== undefined,
        })}
        src={source}
        alt={`routing button`}
        fill={true}
      />
      <div
        className={cx("routeButton", stage, {
          pcOnly: isPc,
          mobileOnly: !isPc,
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
