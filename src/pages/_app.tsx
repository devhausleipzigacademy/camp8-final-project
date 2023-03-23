import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Staatliches } from "@next/font/google";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-grad-frame h-screen w-auto">
      <Component {...pageProps} />
    </div>
  );
}
