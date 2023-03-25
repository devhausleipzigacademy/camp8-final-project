import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Staatliches } from "@next/font/google";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <div id="screen" className="bg-grad-frame h-screen w-auto">
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </div>
  );
}
