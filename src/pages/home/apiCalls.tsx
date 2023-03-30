import { List } from "@prisma/client";
import axios from "axios";

//create a binding to store the Name provided by event, obChange. Will be updated as typing. ApiChangeListName will be triggered when clicking enter
export const newCardId = (user_id: string) => {
  console.log(user_id, "Hello");

  return axios.post("http://localhost:3000/api/lists?id=user_id");
};

export function askApiForCards(user_id: string) {
  return axios.get(`/api/lists?id=${user_id}`).then((res) => res.data);
}

export function apiDeleteList(list_id: string) {
  return axios.delete(`http://localhost:3000/api/lists?id=${list_id}`);
}

export function apiChangeListName(list_id: string, updatedName: string) {
  console.log({
    what: "name",
    toWhat: updatedName,
    id: list_id,
  });

  return axios.patch("http://localhost:3000/api/lists", {
    what: "name",
    toWhat: updatedName,
    id: list_id,
  });
}

export function apiPinList(list_id: string) {
  return axios.patch(`http://localhost:3000/api/lists`, {
    what: "pin",
    toWhat: "",
    id: list_id,
  });
}
