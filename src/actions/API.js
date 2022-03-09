import { ROOT_URL } from "../untilities/constants.js";

export const fetchBoardDetail = async (id) => {
   const request = await fetch(`${ROOT_URL}/v1/boards/${id}`)
      .then((response) => response.json())
      .then((data) => data.result)
      .catch((error) => console.log(error));
   return request;
};

export const updateBoard = async (id, data) => {
   const request = await fetch(`${ROOT_URL}/v1/boards/${id}`, {
      method: "PUT",
      mode: 'cors',
      headers: {
         'Content-Type': "application/json",
      },
      body: JSON.stringify(data),
   })
      .then((response) => response.json())
      .catch((error) => console.log(error));
   return request;
};

export const createNewColumn = async (data) => {
   const request = await fetch(`${ROOT_URL}/v1/columns`, {
      method: "POST",
      mode: 'cors',
      headers: {
         'Content-Type': "application/json",
      },
      body: JSON.stringify(data),
   })
      .then((response) => response.json())
      .then((data) => data.insertedId)
      .catch((error) => console.log(error));
   return request;
};

//update or soft delete column
export const updateColumn = async (id, data) => {
   const request = await fetch(`${ROOT_URL}/v1/columns/${id}`, {
      method: "PUT",
      mode: 'cors',
      headers: {
         'Content-Type': "application/json",
      },
      body: JSON.stringify(data),
   })
      .then((response) => response.json())
      .catch((error) => console.log(error));
   return request;
};

export const createNewCard = async (data) => {
   const request = await fetch(`${ROOT_URL}/v1/cards`, {
      method: "POST",
      mode: 'cors',
      headers: {
         'Content-Type': "application/json",
      },
      body: JSON.stringify(data),
   })
      .then((response) => response.json())
      .then((data) => data.insertedId)
      .catch((error) => console.log(error));
   return request;
};

export const updateCard = async (id, data) => {
   const request = await fetch(`${ROOT_URL}/v1/cards/${id}`, {
      method: "PUT",
      mode: 'cors',
      headers: {
         'Content-Type': "application/json",
      },
      body: JSON.stringify(data),
   })
      .then((response) => response.json())
      .catch((error) => console.log(error));
   return request;
};

export const deleteManyCards = async (data) => {
   const request = await fetch(`${ROOT_URL}/v1/cards`, {
      method: "POST",
      mode: 'cors',
      headers: {
         'Content-Type': "application/json",
      },
      body: JSON.stringify(data),
   })
      .then((response) => response.json())
      .then((data) => data.insertedId)
      .catch((error) => console.log(error));
   return request;
};
