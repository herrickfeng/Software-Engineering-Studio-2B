import axios from "axios";
import { API_HOST } from ".";

export const uploadImage = async (fileData) => {
  const res = await axios.post (`http://${API_HOST}/image/upload`, fileData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  return res;
};

export const downloadImage = async (userId) => {
  const res = await axios.get(`http://${API_HOST}/image/download`, userId)
  return res;
}