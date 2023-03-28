import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Staatliches } from "@next/font/google";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
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
