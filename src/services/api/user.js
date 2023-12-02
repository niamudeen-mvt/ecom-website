import { REGISTER } from "redux-persist";
import api from "../../utils/axios";
import { LOGIN, LOGOUT, REFRESH_TOKEN, USER_DETAILS } from "../url";

export const registerUser = async (body) => {
  try {
    const response = await api.post(REGISTER, body);
    return response;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (body) => {
  try {
    const response = await api.post(LOGIN, body);
    return response;
  } catch (error) {
    return error;
  }
};
export const userById = async () => {
  try {
    const response = await api.get(USER_DETAILS);
    return response;
  } catch (error) {
    return error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.get(LOGOUT);
    return response;
  } catch (error) {
    return error;
  }
};

export const refreshToken = async () => {
  try {
    const response = await api.get(REFRESH_TOKEN);
    return response;
  } catch (error) {
    return error;
  }
};
