import axios from "axios";
// const BASE_URL = "https://fakestoreapi.com/products";

const BASE_URL = "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
});
export default api;
