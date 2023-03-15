import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import styles from "./homeComponents.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type Props = {
  source: string | StaticImageData;
  drawRect: [number, number, number, number];
  callBackFunction: () => void;
  isPc: boolean;
};

export default function RouteButton({
  source,
  drawRect,
  callBackFunction,
  isPc,
}: Props) {
  const [left, top, width, height] = drawRect.map((num) => `${num}%`);
  const [buttonState, setButtonState] = useState({
    hovered: false,
    pressed: false,
  });

  return (
    <>
      <div
        className={cx("routeButton", { pcOnly: isPc, mobileOnly: !isPc })}
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
        onClick={() => callBackFunction()}
      />
      <Image
        className={cx("prop", buttonState, { pcOnly: isPc, mobileOnly: !isPc })}
        src={source}
        alt={`routing button`}
        fill={true}
      />
    </>
  );
}
