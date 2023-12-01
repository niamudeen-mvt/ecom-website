import api from "../../utils/axios";

export const fetchProducts = () => async (dispatch) => {
  try {
    let response = await api.get("/get-products");
    if (response.status === 200) {
      dispatch({ type: "FETCH_DATA", payload: response?.data?.products });
    }
  } catch (error) {
    console.log(error);
  }
};

export const filterByCategory = (category) => async (dispatch) => {
  try {
    let { data } = await api.get(`/category/${category}`);
    dispatch({ type: "FILTER_BY_CATEGORY", payload: data });
  } catch (error) {
    console.log(error);
  }
};
