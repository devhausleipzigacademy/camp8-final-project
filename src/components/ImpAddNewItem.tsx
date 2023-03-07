import { useState, useEffect } from "react";
import ListItem from "./ListItem";
import { SearchBar } from "./SearchBar";
import axios from "axios";

function ImpAddNewItem() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<string[]>();
  const fetchData = async () => {
    const response = (await axios
      .get(
        //check placeholder of endpoint
        `http://localhost:3000/api/autocomplete?name=${searchTerm}`
      )
      .then((res) => res.data)) as string[];
    setData(response);
  };

  return (
    <div>
      <input
        type="text"
        onChange={(event) => {
          setSearchTerm(event.target.value);
          fetchData();
        }}
      />
      {data?.map((x) => {
        return <p key={x}>{x}</p>;
      })}
    </div>
  );
}

export default ImpAddNewItem;
