import axios from "axios";
import { API_HOST } from ".";

export const uploadImage = async (fileData) => {
  const res = await axios({
    method: 'post',
    url: `http://${API_HOST}/image/upload`,
    data: fileData,
    headers: {'Content-Type': 'multipart/form-data'},
  });
  return res;
};