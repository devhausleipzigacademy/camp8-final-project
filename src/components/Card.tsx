type Props = {
  data?: {
    title?: string;
    dateCreated?: string;
    itemCount?: number;
  };
};

export default function Card(props: Props) {
  return (
    <div className="border rounded-lg border-purple-300 p-4 flex flex-col w-full h-full justify-around items-center">
      {props.data ? (
        <>
          <h2 className="text-lg">{props.data.title}</h2>
          <div className="flex justify-between text-purple-500 text-sm gap-2">
            <p>{props.data.dateCreated}</p>
            {props.data.itemCount && <p>{props.data.itemCount} Item</p>}
          </div>
        </>
      ) : (
        <h2 className="text-lg">+ Add a list</h2>
      )}
    </div>
  );
}
