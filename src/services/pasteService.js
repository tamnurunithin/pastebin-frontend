import axios from "axios";

const API_URL =
  "https://pastebin-backend-1w1g.onrender.com/api/pastes";

export const createPaste = async (data) => {
  return await axios.post(API_URL, data);
};

export const getPaste = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};