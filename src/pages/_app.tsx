import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-grad-frame h-screen w-screen">
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </div>
  );
}
