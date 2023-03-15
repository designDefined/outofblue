import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AudioPlayer from "@/components/common/AudioPlayer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AudioPlayer />
      <Component {...pageProps} />
    </>
  );
}
