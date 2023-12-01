import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layout/header/Header";
import Cart from "./pages/cart/Cart";
import Product from "./pages/Product";
import SignupForm from "./pages/auth/SignupForm";
import LoginForm from "./pages/auth/LoginForm";
import { ToastContainerNotification } from "./utils/notifications";
import User from "./pages/user";
import ProtectedRoute from "./auth/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="" element={<ProtectedRoute />}>
          <Route path="user" element={<User />} />
        </Route>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <ToastContainerNotification />
    </BrowserRouter>
  );
};

export default App;
