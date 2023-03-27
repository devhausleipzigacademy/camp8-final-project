import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Staatliches } from "@next/font/google";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-grad-frame h-screen w-full px-8">
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
}
