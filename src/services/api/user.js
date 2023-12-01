import api from "../../utils/axios";

export const registerUser = async (body) => {
  try {
    const response = await api.post("/auth/register", body);
    return response;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (body) => {
  try {
    const response = await api.post("/auth/login", body);
    return response;
  } catch (error) {
    return error;
  }
};
export const userById = async (id) => {
  try {
    const response = await api.get(`/auth/user/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
