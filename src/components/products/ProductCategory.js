import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

const ProductCategory = ({ setActiveCategory }) => {
  const [isActive, setIsActive] = useState(0);

  const categoryList = [
    "men's clothing",
    "electronics",
    "jewelery",
    "women's clothing",
  ];

  const handleCategoryFilter = (category, index) => {
    setIsActive(index);
    setActiveCategory(category);
  };

  return (
    <div className="text-center product_title">
      <h1 className="mb-5">Latest Products</h1>
      <Row>
        {categoryList?.length
          ? categoryList.map((category, index) => {
              return (
                <Col className="d-flex justify-content-center mb-3">
                  <button
                    key={category}
                    className={`w-100 mx-3 px-5 btn ${
                      isActive === index ? "btn-dark" : "btn-outline-dark"
                    }`}
                    onClick={() => handleCategoryFilter(category, index)}
                  >
                    {category}
                  </button>
                </Col>
              );
            })
          : null}
      </Row>
    </div>
  );
};

export default ProductCategory;
