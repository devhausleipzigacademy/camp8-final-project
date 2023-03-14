import { GetServerSideProps } from "next";
import axios from "axios";
import { Item } from "@prisma/client";
import { useRouter } from "next/router";

type Category = {
  id: string;
  name: string;
  item: Item[];
};

type InputProps = {
  listName: string;
  list: Category[];
};

export default function Home(getData: InputProps) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const handleClick = async () => {
    await axios.post("http://localhost:3000/api/addItem", {
      query: "sage",
      inputList: "ae13eb05-521d-414a-b762-0da39361b5e9",
    });
    refreshData();
  };

  return (
    <div>
      <div>{JSON.stringify(getData)}</div>
      <button
        className="bg-grad-default p-4 rounded-md text-text-white"
        onClick={handleClick}
      >
        Add Sage
      </button>
    </div>
  );
}

const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug; // slug = listId
  const getData: InputProps = await axios
    .get(`http://localhost:3000/api/listItems?inputList=${slug}`)
    .then((res) => res.data);

  return {
    props: {
      getData,
    },
  };
};

export { getServerSideProps };
