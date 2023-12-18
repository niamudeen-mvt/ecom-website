import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layout/header/Header";
import Cart from "./pages/cart/Cart";
import SignupForm from "./pages/auth/SignupForm";
import LoginForm from "./pages/auth/LoginForm";
import User from "./pages/user";
import SingleProduct from "./pages/products/SingleProduct";
import ProtectedRoute from "./auth/ProtectedRoute";
import { ToastContainerNotification } from "./utils/notifications";
// import Test from "./pages/Test";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/test" element={<Test />} /> */}
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="" element={<ProtectedRoute />}>
          <Route path="profile" element={<User />} />
        </Route>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/sucess" element={<div>success</div>} />
        <Route path="/cancel" element={<div>cancel</div>} />
        <Route path="*" element={<Home />} />
      </Routes>
      <ToastContainerNotification />
    </BrowserRouter>
  );
};

export default App;
