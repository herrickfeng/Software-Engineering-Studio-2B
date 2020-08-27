import axios from "axios";
import { API_HOST } from ".";

export const uploadImage = async (fileData) => {
  const res = await axios.post(`http://${API_HOST}/image/upload`, fileData);
  return res;
};