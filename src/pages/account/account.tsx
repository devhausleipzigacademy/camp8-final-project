import { LargeButton } from "@/components/shared/LargeButton";
import { FiUser } from "react-icons/fi";
import axios from "axios";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Input from "@/components/shared/Input";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SmallButton } from "@/components/SmallButton";

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

  function updateNameHandler() {
    updateName();
    refresh(user.email as string);
  }

  return (
    <>
      <div className="w-full flex-grow flex flex-col justify-around items-center gap-5 mt-12">
        <FiUser size={28} />
        <div className="text-primary-default-Solid dark:text-white font-heading text-4xl m-8">
          Hey,&nbsp;
          {player?.name ? player.name : player?.email}
        </div>
        <div className="w-full flex flex-col m-5 gap-5">
          <Input
            placeholder={"New name"}
            onChange={(e) => setInputName(e.target.value)}
            value={inputName}
            component={
              <div className="absolute flex self-center right-0 items-center justify-center rounded-lg">
                <SmallButton
                  label="Update"
                  onClick={() => updateNameHandler()}
                />
              </div>
            }
          ></Input>

          <LargeButton variant="primary" onClick={redirect} disabled={false}>
            Change E-Mail
          </LargeButton>

          <LargeButton
            variant="secondary"
            onClick={handleSignOut}
            disabled={false}
          >
            Log-Out
          </LargeButton>
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
