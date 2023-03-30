import Head from "next/head";
import TabAccountSetting from "@/components/TabAccountSetting";

export default function Settings() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-4xl font-bold flex justify-center">Settings </h1>
      <div className="dark:bg-primary-default-Dark flex justify-center text-text-white ">
          <TabAccountSetting />
      </div>
    </>
  );
}
