import { Tab } from "@headlessui/react";
import { User } from "@prisma/client";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import AccountView from "./account";
import Settings from "./settings";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  const user = session?.user;

  return {
    ...(user
      ? {
          props: {
            user: user,
          },
        }
      : {
          redirect: {
            permanent: false,
            destination: "auth/signin",
          },
        }),
  };
};

type AccountAndSettingsProps = {
  user: User;
};

export default function AccountAndSettings({ user }: AccountAndSettingsProps) {
  // define queries & mutations here

  const options = {
    Account: <AccountView user={user} />,
    Settings: <Settings />,
  };

  const optionLabels = Object.keys(options) as (keyof typeof options)[];
  const optionComponents = Object.values(
    options
  ) as typeof options[keyof typeof options][];

  const initialSelected = optionLabels[0];
  const [selected, setSelected] = useState(
    initialSelected as keyof typeof options
  );

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full">
        <Link href="/home">
          <FiChevronLeft size={28} />
        </Link>
        <Tab.Group
          onChange={(index) => {
            setSelected(optionLabels[index]);
          }}
        >
          <Tab.List className="flex rounded-md bg-secondary-default text-lg mx-11 ">
            {optionLabels.map((label, index) => (
              <Tab className=" flex w-full" key={index}>
                {({ selected }) => (
                  <label
                    className={clsx(
                      "w-full rounded-md h-11 flex items-center justify-center",
                      selected
                        ? "bg-primary-default-Solid text-text-white "
                        : "bg-secondary-default text-text-typo"
                    )}
                  >
                    {label as string}
                  </label>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {optionComponents.map((option, idx) => (
              <Tab.Panel key={idx}>{option}</Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
}
