import axios from "axios";

export function askApiForCards(user_id: string) {
  return axios.get(`/api/getCards?id=${user_id}`).then((res) => res.data);
}

export function apiDeleteList(list_id: string) {
  return fetch(`http://localhost:3000/api/deleteList?id=${list_id}`, {
    method: "DELETE",
  });
}

export function apiChangeListName(list_id: string, updatedName: string) {
  return fetch("/api/updateListName", {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      newName: updatedName,
      id: list_id,
    }),
  });
}

export function apiPinList(list_id: string) {  
  return fetch(`http://localhost:3000/api/pinList?id=${list_id}`, {
    method: "PATCH"
  });
}

export function apiUnpinList(list_id: string) {
  return fetch(`http://localhost:3000/api/unpinList?id=${list_id}`, {
    method: "PATCH"
  });
}
