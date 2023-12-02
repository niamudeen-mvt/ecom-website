import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// const BASE_URL = "http://localhost:5000/api/v1";
const BASE_URL = "https://elegant-fawn-sun-hat.cyclic.app/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  async function (config) {
    config.headers["Authorization"] = `Bearer ${sessionStorage.getItem(
      "access_token"
    )}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// const checkTokenExpiration = () => {
//   const token = sessionStorage.getItem("access_token");

//   if (token) {
//     const decodedToken = jwtDecode(token);
//     if (decodedToken.exp * 1000 < Date.now()) {
//       return true;
//     }
//     return false;
//   }
// };

export default api;
