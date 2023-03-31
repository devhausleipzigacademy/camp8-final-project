import { LargeButton } from "@/components/shared/LargeButton";
import { FiUser } from "react-icons/fi";
import axios from "axios";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Input from "@/components/Input";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type SettingsProps = {
  user: User;
};

export type UpdateNameResponse = {
  name: string;
  userId: string;
};

export default function AccountView({ user }: SettingsProps) {
  const [inputName, setInputName] = useState("");

  const queryClient = useQueryClient();
  const { data: player } = useQuery(["useInfo"], () =>
    getUserInfo(user.email as string)
  );

  const { mutate: refresh } = useMutation(getUserInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["useInfo"]);
    },
  });

  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl: "/auth/signIn" });
  };
  const router = useRouter();
  const redirect = () => {
    router.push("/account/changeEmail");
  };

  async function updateName() {
    return await axios.patch("http://localhost:3000/api/user", {
      id: player?.id,
      what: "name",
      toWhat: inputName,
    });
  }

  function clickHandler() {
    updateName();
    refresh(user.email as string);
  }

  return (
    <>
      <div className="w-full flex-grow flex flex-col justify-around items-center gap-5 mt-5">
        <div>
          <FiUser size={28} />
        </div>
        <div className="text-primary-default-Solid font-heading text-4xl m-8">
          Hey,&nbsp;
          {player?.name ? player.name : player?.email}
        </div>
        <div className="w-full flex flex-col m-5 gap-5">
          <Input
            type={"New name"}
            name={inputName}
            setValue={setInputName}
            value={""}
            placeholder={"New name"}
            onClick={clickHandler}
          ></Input>

          <LargeButton
            variant="primary"
            label="Change E-Mail"
            onClick={redirect}
            disabled={false}
          />
          <LargeButton
            variant="secondary"
            label="Log-Out"
            onClick={handleSignOut}
            disabled={false}
          />
        </div>
      </div>
    </>
  );
}
const getUserInfo = async (email: string) => {
  return (await axios
    .get(`http://localhost:3000/api/user?email=${email}`)
    .then((res) => res.data)) as User;
};
