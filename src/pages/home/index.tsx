import { FullHeader } from "@/components/FullHeader";
import { PlusButton } from "@/components/PlusButton";
import CardsWrapper from "@/pages/home/CardsWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newCardId } from "./apiCalls";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { User } from "@prisma/client";
import axios from "axios";

type InputProps = {
  user: User;
};
export default function Home({ user }: InputProps) {
  //link to queryClient in app.tsx
  const queryClient = useQueryClient();

  //updates data linked to render all cards automatically as newCardId is called
  const { mutate: createNewCard } = useMutation({
    mutationFn: (id_user: string) => newCardId(id_user),
    onSuccess: () => queryClient.invalidateQueries(["cards"]),
  });

  return (
    <div className="grid grid-row-2 h-full relative">
      <div className="row-span-1">
        <FullHeader
          classes={""}
          name={(user.name as string).split(" ")[0]}
        ></FullHeader>
      </div>
      <div className="row-span-1 h-full overflow-y-scroll">
        <CardsWrapper user_id={user.id} />
      </div>
      <PlusButton
        onClick={() => {
          createNewCard(user.id);
        }}
      ></PlusButton>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  const user: User = await axios
    .get(`http://localhost:3000/api/user?email=${session?.user?.email}`)
    .then((z) => z.data);

  return {
    props: {
      user: user,
    },
  };
};
