import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/v1";
const BASE_URL = "https://elegant-fawn-sun-hat.cyclic.app";

const api = axios.create({
  baseURL: BASE_URL,
});
export default api;
