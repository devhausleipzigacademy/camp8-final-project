type ListItemProps = {
  name: string;
  image: string;
};

export default function ListItem(props: ListItemProps) {
  return (
    <>
      <div className="flex flex-row w-full justify-between items-center">
        <img className="h-12 w-12" src={props.image} alt="" />
        <p>{props.name}</p>
        <p>Quantity</p>
        <button name="checkbox" className="h-10 w-10 bg-green-300"></button>
      </div>
    </>
  );
}
