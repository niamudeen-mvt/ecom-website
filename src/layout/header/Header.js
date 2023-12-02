import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { FiLogOut } from "react-icons/fi";
import "./header.css";

const Header = () => {
  const { userId, logout, cartList } = useLocalStorage();
  const route = useLocation()?.pathname;

  return (
    <Navbar expand="lg" bg="light" data-bs-theme="light" sticky="top">
      <Container>
        <Navbar.Brand to="#home">Ecommerce-Website</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto  flexCenter">
            <Link
              to="/"
              className={` pt-2 mx-2 ${route === "/" ? "active" : "link"}`}
            >
              HOME
            </Link>
            {userId === null ? (
              <Link
                to="/signup"
                className={` pt-2 mx-2 ${
                  route === "/signup" ? "active" : "link"
                }`}
              >
                SIGNUP
              </Link>
            ) : null}
            {userId === null ? (
              <Link
                to="/login"
                className={` pt-2 mx-2 ${
                  route === "/login" ? "active" : "link"
                }`}
              >
                LOGIN
              </Link>
            ) : null}
            {userId === null ? null : (
              <Link
                to="/cart"
                className={` pt-2 mx-2 ${
                  route === "/cart" || route.split("/")[1] === "product"
                    ? "active"
                    : "link"
                }`}
              >
                CART {cartList?.length === 0 ? "" : `(${cartList.length})`}
              </Link>
            )}
            {userId === null ? null : (
              <Link
                to="/user"
                className={` pt-2 mx-2 ${
                  route === "/user" || route.split("/")[1] === "product"
                    ? "active"
                    : "link"
                }`}
              >
                PROFILE
              </Link>
            )}
            {userId === null ? null : (
              <Link
                to="#"
                className={` pt-2 mx-2 ${
                  route === "/user" || route.split("/")[1] === "product"
                    ? "active"
                    : "link"
                }`}
                onClick={() => logout()}
              >
                <FiLogOut />
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
