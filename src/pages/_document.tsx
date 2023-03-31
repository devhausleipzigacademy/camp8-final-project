import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="min-h-screen pt-7 px-7 sm:pt-7 sm:px-7 md:px-80 md:py-7 bg-primary-frame">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
