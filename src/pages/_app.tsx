import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { useStyleStore, useSzieStore } from "./stores/styleStore";
import clsx from "clsx";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { darkMode } = useStyleStore();
  const { size } = useSzieStore();

  useEffect(() => {
    const htmlElement = document.getElementsByTagName("html")[0];
    if (darkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const htmlElement = document.getElementsByTagName("html")[0];
    if (size) {
      htmlElement.classList.add("big");
    } else {
      htmlElement.classList.remove("big");
    }
  }, [size]);

  return (
    <div className={clsx("bg-grad-frame h-screen w-auto", darkMode && "dark")}>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
}
