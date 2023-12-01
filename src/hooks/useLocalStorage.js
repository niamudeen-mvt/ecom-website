import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cartProductsByUserId } from "../services/api/products";
import { getUserId } from "../utils/helper";
import { userById } from "../services/api/user";
import { sendNotification } from "../utils/notifications";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartProducts } from "../store/actions/cartActions";

export const useLocalStorage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(getUserId());
  const [currentUser, setCurrentUser] = useState({});
  const [refreshList, setRefreshList] = useState(false);

  const cartList = useSelector((state) => state?.cart);

  const dispatch = useDispatch();

  const storedUserId = localStorage.getItem("userId");
  const fetchCartList = async () => {
    let res = await cartProductsByUserId(userId);
    if (res?.status === 200) {
      dispatch(fetchCartProducts(res?.data?.cart));
    } else {
      sendNotification("warning", res?.response?.data?.message);
    }
  };

  useEffect(() => {
    setUserId(storedUserId);
  }, [storedUserId]);

  useEffect(() => {
    console.log("fetching cart list");
    fetchCartList();
  }, [refreshList]);

  useEffect(() => {
    (async () => {
      let response = await userById(userId);
      if (response?.status === 200) {
        setCurrentUser(response?.data?.user);
      }
    })();
  }, [userId]);

  const logout = () => {
    localStorage.removeItem("userId");
    setUserId(null);
    navigate("/");
  };

  return { userId, currentUser, logout, cartList, refreshList, setRefreshList };
};
