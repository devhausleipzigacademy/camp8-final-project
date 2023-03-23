import "@/styles/globals.css";
import type { AppProps } from "next/app";
<<<<<<< HEAD
import { SessionProvider } from "next-auth/react";
export default function App({
  Component,
  pageProps: { getSession, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={getSession}>
      <Component {...pageProps} />
    </SessionProvider>
=======
import { Inter, Staatliches } from "@next/font/google";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-grad-frame h-screen w-auto">
      <Component {...pageProps} />
    </div>
>>>>>>> main
  );
}
