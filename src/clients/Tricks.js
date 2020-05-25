import axios from "axios";
import { SERVER_URL } from "../../config";
require('dotenv').config()

const url = process.env.SERVER_URL || SERVER_URL;

export const getTricks = () => {
  return axios.get(url + "/tricks");
};

export const getTrick = trickId => {
  return axios.get(url + "/trick/" + trickId);
};

export const addTrick = trick => {
  return axios.post(url + "/tricks", trick);
};

export const editTrick = trick => {
  return axios.put(url + `/trick/${trick.id}`, trick);
};

export const deleteTrick = trickId => {
  return axios.delete(url + "/trick/" + trickId);
};
