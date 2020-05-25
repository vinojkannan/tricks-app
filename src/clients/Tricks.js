import axios from "axios";
import { SERVER_URL } from "../../config";


export const getTricks = () => {
  console.log('process env', process.env)
  return axios.get(SERVER_URL + "/tricks");
};

export const getTrick = trickId => {
  return axios.get(SERVER_URL + "/trick/" + trickId);
};

export const addTrick = trick => {
  return axios.post(SERVER_URL + "/tricks", trick);
};

export const editTrick = trick => {
  return axios.put(SERVER_URL + `/trick/${trick.id}`, trick);
};

export const deleteTrick = trickId => {
  return axios.delete(url + "/trick/" + trickId);
};
