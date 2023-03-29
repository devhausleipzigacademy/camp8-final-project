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
  const [queryClient] = useState(() => new QueryClient());

  return (
    <div className="bg-grad-frame h-screen w-full flex justify-center items-center fixed p-[30px]">
      <div className="flex flex-col max-w-md:20 m-[30px] overflow-y-scroll">
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <Component {...pageProps} />
          </SessionProvider>
        </QueryClientProvider>
      </div>
    </div>
  );
}
