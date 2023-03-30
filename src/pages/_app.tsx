import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useSzieStore } from "./stores/styleStore";
import { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { isFontSizeBig } = useSzieStore();

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (isFontSizeBig) {
      htmlElement && htmlElement.classList.add("big");
    } else {
      htmlElement && htmlElement.classList.remove("big");
    }
  }, [isFontSizeBig]);

  return (
    <ThemeProvider attribute="class">
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
