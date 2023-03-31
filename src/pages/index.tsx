import { LargeButton } from "@/components/shared/LargeButton";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

export default function Home() {
  return (
    <>
      <div className="flex flex-col pt-12 justify-center items-center">
        <Image
          src="/images/listfull-logo.png"
          alt=""
          width={218}
          height={186}
        />
      </div>
      <h1 className=" text-text-typo text-splash px-8">
        HI THERE! WELCOME TO SHOPPING HELPER
      </h1>
      <div className="px-8 pt-10">
        <Link href={"/auth/signIn"}>
          <LargeButton variant={"primary"} disabled={false}>
            get started
          </LargeButton>
        </Link>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/home",
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};
