import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import AudioPlayer from "@/components/common/AudioPlayer";
import MenuBar from "@/components/common/MenuBar";
import AmbiencePlayer from "@/components/common/AmbiencePlayer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AudioPlayer />
      <AmbiencePlayer />
      <Component {...pageProps} />
      <MenuBar />
    </>
  );
}
