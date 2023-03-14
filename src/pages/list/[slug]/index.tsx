import { GetServerSideProps } from "next";
type Input = {
  slug: string;
};
export default function Home({ slug }: Input) {
  return (
    <div>
      <div>I am a list {slug}</div>
    </div>
  );
}

const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug;
  const snail = params?.snail;

  return {
    props: {
      slug,
    },
  };
};

export { getServerSideProps };
