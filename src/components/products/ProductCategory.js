import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterByCategory } from "../../store/actions/productAction";
import { Col, Row } from "react-bootstrap";
import api from "../../utils/axios";

const ProductCategory = () => {
  const [isActive, setIsActive] = useState(2);
  const [categoryList, setCategoryList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        let { data } = await api.get(`/categories`);
        setCategoryList(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const handleCategoryFilter = (category, index) => {
    setIsActive(index);
    dispatch(filterByCategory(category));
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
