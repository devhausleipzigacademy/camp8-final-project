import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="min-h-screen dark:bg-dark-primary-frame dark:text-white dark:border-secondary-transparent pt-7 px-7 sm:pt-7 sm:px-7 md:px-80 md:py-7 bg-grad-frame">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
