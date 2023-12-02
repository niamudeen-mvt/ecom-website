import api from "../../utils/axios";
import {
  LOGIN_USER,
  LOGOUT,
  LOGOUT_USER,
  REFRESH_TOKEN,
  REGISTER_USER,
  USER_DETAILS,
} from "../url";

export const registerUser = async (body) => {
  try {
    const response = await api.post(REGISTER_USER, body);
    return response;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (body) => {
  try {
    const response = await api.post(LOGIN_USER, body);
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
    const response = await api.get(LOGOUT_USER);
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
