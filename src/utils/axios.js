import axios from "axios";
// import { refreshToken } from "../services/api/user";
// import { sendNotification } from "./notifications";

// const BASE_URL = "http://localhost:5000/api/v1";
const BASE_URL = "https://elegant-fawn-sun-hat.cyclic.app/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error, "error");
    if (error?.response && error?.response?.data?.message === "jwt expired") {
      // sendNotification("warning", error?.response?.data?.message);
      // let res = await refreshToken();
    }
    return Promise.reject(error);
  }
);

export default api;
