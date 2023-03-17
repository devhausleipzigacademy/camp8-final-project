import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
export default function App({
  Component,
  pageProps: { getSession, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={getSession}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
