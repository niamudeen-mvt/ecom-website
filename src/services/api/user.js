import axios from "axios";

export const registerUser = async (body) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/register",
      body
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (body) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      body
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const userById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/auth/user/${id}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
