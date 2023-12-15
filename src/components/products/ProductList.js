import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { fetchProducts } from "../../store/actions/productAction";
import defaultProductImg from "../../assets/images/photo-1591047139829-d91aecb6caea.avif";
import { GoLinkExternal } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import "./product.css";

const Productlist = ({ activeCategory }) => {
  const productList = useSelector((state) => state?.products);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleGoTo = (id) => {
    navigate(`/product/${id}`);
  };

  const updatedProductList = productList?.filter((product) => {
    return product?.category === activeCategory;
  });

  return (
    <Row>
      {updatedProductList?.length
        ? updatedProductList.map((product) => {
            return (
              <Col key={product?.id} md={4} className="product_card_column">
                <div className="shadow-sm pb-3 product_card_container cursor">
                  <div className="product_img_container flexCenter">
                    <img
                      src={product?.image ? product.image : defaultProductImg}
                      alt="product"
                    />
                  </div>
                  <div className="product_details mt-4 px-4 ">
                    <h4>{product?.title?.substring(0, 40)}</h4>
                    <p>Rs. {product?.price}</p>
                  </div>
                  {/* <div
                    className="p-2 bg-black rounded-1 cursor"
                    style={{
                      position: "absolute",
                      right: "30px",
                      bottom: "30px",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  >
                    <IoMdAdd size={22} color="white" />
                  </div> */}

                  <div className="image_overlay flexGrid">
                    <GoLinkExternal
                      className="go_to_link cursor"
                      onClick={() => handleGoTo(product?.product_id)}
                    />
                  </div>
                </div>
              </Col>
            );
          })
        : null}
    </Row>
  );
};

export default Productlist;
