import axios from "axios";

export function askApiForCards(user_id: string) {
  return axios.get(`/api/getCards?id=${user_id}`).then((res) => {
    return res.data;
  });
}

export function ApiDeleteList(list_id: string) {
    return fetch(`http://localhost:3000/api/deleteList?id=${list_id}`, {
      method: "DELETE",
    }).then((response) => {
      return response;
    });
  }

export function ApiChangeListName(list_id: string, updatedName: string) {
    return fetch("/api/updateListName", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        newName: updatedName,
        id: list_id,
      }),
    }).then((response) => {
      return response;
    });
  }

export function ApiPnList(list_id: string) {
    return fetch(`http://localhost:3000/api/deleteList?id=${list_id}`, {
      method: "PATCH",
    }).then((response) => {
      return response.json();
    });
  }

export  function ApiUnpinList(list_id: string) {
    return fetch(`http://localhost:3000/api/deleteList?id=${list_id}`, {
      method: "PATCH",
    }).then((response) => {
      return response.json();
    });
  }