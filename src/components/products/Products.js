import React from "react";
import { Container } from "react-bootstrap";
import "./product.css";
import ProductCategory from "./ProductCategory";
import Productlist from "./ProductList";
import HeroSection from "../hero-section";

const Products = () => {
  return (
    <>
      <HeroSection />
      <section className="common_section">
        <Container>
          <ProductCategory />
          <Productlist />
        </Container>
      </section>
    </>
  );
};

export default Products;
