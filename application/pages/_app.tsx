import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import AudioPlayer from "@/components/common/AudioPlayer";
import MenuBar from "@/components/common/MenuBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
