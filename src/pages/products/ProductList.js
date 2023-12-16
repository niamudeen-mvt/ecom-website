import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { fetchProducts } from "../../store/actions/productAction";
import defaultProductImg from "../../assets/images/photo-1591047139829-d91aecb6caea.avif";
import "./product.css";
import { IoSearch } from "react-icons/io5";
import Loader from "../../components/Loader";

const Productlist = ({ activeCategory }) => {
  const productList = useSelector((state) => state?.products);
  console.log(productList, ">>");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleGoTo = (id) => {
    navigate(`/product/${id}`);
  };

  const updatedProductList = productList?.filter((product) => {
    return activeCategory === "All"
      ? product
      : product?.category === activeCategory;
  });

  return (
    <Row>
      {updatedProductList?.length ? (
        updatedProductList.map((product) => {
          return (
            <Col
              key={product?.id}
              xs={12}
              sm={6}
              md={4}
              xl={3}
              className="mb-4"
            >
              <div className="product_card_container bg-body-tertiary cursor h-100 position-relative overflow-hidden">
                <div className="product_img_container flexCenter">
                  <img
                    src={product?.image ? product.image : defaultProductImg}
                    alt="product"
                    className="w-50 h-50"
                  />
                </div>
                <div className="product_details mt-4 px-4">
                  <p className="fw-medium">
                    {product?.title?.substring(0, 40)}
                  </p>
                  <p>${product?.price}</p>
                </div>

                <div className="position-absolute top-0 start-0 w-100 h-100 product__overlay flexCenter">
                  <button
                    className="rounded-circle border-0 bg-body-tertiary search__icon"
                    style={{
                      height: "40px",
                      width: "40px",
                    }}
                    onClick={() => handleGoTo(product?.product_id)}
                  >
                    <IoSearch color="black" />
                  </button>
                </div>
              </div>
            </Col>
          );
        })
      ) : (
        <Loader />
      )}
    </Row>
  );
};

export default Productlist;
