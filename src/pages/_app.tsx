import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { useStyleStore } from "./stores/styleStore";
import { useEffect } from "react";


export default function App({ Component, pageProps }: AppProps) {
  const { darkMode } = useStyleStore();

  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const htmlElement = document.getElementsByTagName("html")[0];
    if (darkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="bg-grad-frame h-screen w-full px-8">
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </div>
  );
}
