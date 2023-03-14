import { GetServerSideProps } from "next";
import axios from "axios";
import { Item } from "@prisma/client";

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
  return <div></div>;
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
