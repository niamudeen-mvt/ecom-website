import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cartProducts } from "../services/api/products";
import { getUserId } from "../utils/helper";
import { logoutUser, userById } from "../services/api/user";
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
    if (userId !== null) {
      let res = await cartProducts(userId);
      if (res?.status === 200) {
        dispatch(fetchCartProducts(res?.data?.cart));
      }
    }
  };

  useEffect(() => {
    setUserId(storedUserId);
  }, [storedUserId]);

  useEffect(() => {
    fetchCartList();
  }, [refreshList]);

  useEffect(() => {
    (async () => {
      let res = await userById();
      if (res?.status === 200) {
        setCurrentUser(res?.data?.user);
      }
    })();
  }, []);

  const logout = async () => {
    await logoutUser();
    localStorage.removeItem("userId");
    setUserId(null);
    navigate("/");
  };

  return { userId, currentUser, logout, cartList, refreshList, setRefreshList };
};
