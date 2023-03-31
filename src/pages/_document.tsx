import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body
        id="List-page"
        className="min-h-screen pt-7 px-7 sm:pt-7 sm:px-7 md:px-80 md:py-7 bg-primary-frame z-0"
      >
        <div className=" hidden z-10 absolute inset-0 bg-text-typo bg-opacity-40 backdrop-blur-sm"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
