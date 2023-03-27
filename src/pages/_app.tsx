import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Staatliches } from "@next/font/google";
import { SessionProvider } from "next-auth/react";
import {useStyleStore} from "./stores/styleStore";
import clsx from "clsx";
import {useEffect} from "react";

export default function App({ Component, pageProps }: AppProps) {

  const {darkMode} = useStyleStore()

  useEffect(() => {
  
    const htmlElement = document.getElementsByTagName("html")[0];
    if (darkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [darkMode])


  return (
    <div className={clsx("bg-grad-frame h-screen w-auto",
      darkMode && "dark"
    )}>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
}
