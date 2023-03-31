import Input from "@/components/shared/Input";
import { LargeButton } from "@/components/shared/LargeButton";
import { Transition } from "@headlessui/react";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { Edit } from "react-feather";

export default function SignIn() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn("email", { email });
  };

  return (
    <div className="h-screen flex flex-col justify-around items-center">
      <div className="flex flex-col pt-12 justify-center items-center">
        <Image src="/images/logo.png" alt="" width={318} height={271} />
      </div>

      <div className="flex flex-col justify-around items-center">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            component={
              <Edit className="absolute top-1/2 -translate-y-1/2 right-4 text-primary-default-Solid pointer-events-none" />
            }
          />

          <Transition
            show={new RegExp(`[A-z]+@[a-z]+.[a-zA-Z]{2,3}$`).test(email)}
            enter="transform transition duration-400"
            enterFrom="opacity-0 scale-y-0"
            enterTo="opacity-100 scale-y-100"
            leave="transform duration-400 transition ease-in-out"
            leaveFrom="opacity-100 scale-y-100"
            leaveTo="opacity-0 scale-y-0"
          >
            <LargeButton
              className="mb-4"
              variant={"primary"}
              disabled={false}
              type="submit"
            >
              Get Magic Link
            </LargeButton>
          </Transition>
        </form>

        <div className="flex items-center gap-1 ">
          <div className="h-0.5 w-10 bg-secondary-default"></div>
          or
          <div className="h-0.5 w-10 bg-secondary-default"></div>
        </div>

        <button
          className="p-3 rounded-md text-center text-primary-default-Solid underline"
          onClick={() => signIn("google")}
          type="button"
        >
          Login with Google
        </button>
      </div>
    </div>
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
