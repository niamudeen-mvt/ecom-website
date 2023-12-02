import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/v1";
const BASE_URL = "https://elegant-fawn-sun-hat.cyclic.app/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async function (config) {
    const access_token = sessionStorage.getItem("access_token");
    if (config.url !== "/auth/login" && config.url !== "/auth/register") {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
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
