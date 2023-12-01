import api from "../../utils/axios";

export const addToCart = async (body) => {
  try {
    const response = await api.post("/add-to-cart", body);
    return response;
  } catch (error) {
    return error;
  }
};

export const removeFromCart = async (body) => {
  try {
    const response = await api.post("/remove-from-cart", body);
    return response;
  } catch (error) {
    return error;
  }
};

// ===== PRODUCTS =========================

export const addProducts = async (body) => {
  try {
    const response = await api.post("/add-product", body);
    return response;
  } catch (error) {
    return error;
  }
};

export const cartProductsByUserId = async (id) => {
  try {
    const response = await api.get(`/cart/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
