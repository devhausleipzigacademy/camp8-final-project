import { useRouter } from "next/router";

const Receipe = () => {
  const router = useRouter();
  const { RID } = router.query;

  return (
    <p className="text-red-600 text-4xl font-bold flex justify-center">
      Post: {RID}
    </p>
  );
};

export default Receipe;
