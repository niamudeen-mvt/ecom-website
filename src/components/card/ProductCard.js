import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { BsCart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { sendNotification } from "../../utils/notifications";
import "./productcard.css";
import { AiOutlineClose } from "react-icons/ai";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { removeFromCart } from "../../services/api/products";

const ProductCard = ({ productList, refreshList, setRefreshList }) => {
  const { userId } = useLocalStorage();
  const [quantities, setQuantities] = useState({});

  const handleDecrement = (id) => {
    // Decrement the quantity for a specific product
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 1) - 1,
    }));
  };

  const handleIncrement = (id) => {
    // Increment the quantity for a specific product
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 1) + 1,
    }));
  };

  const handleRemove = async (id) => {
    let res = await removeFromCart({
      userId: userId,
      product_id: id,
    });
    if (res?.status === 200) {
      sendNotification("success", res?.data?.message);
      setRefreshList(!refreshList);
    } else {
      sendNotification("warning", res?.response?.data?.message);
    }
  };

  let subtotal = productList?.reduce((total, product) => {
    total = total + quantities[product?.product_id] * product?.price;
    return total;
  }, 0);

  const handleProceed = () => {
    sendNotification("success", "Thank you for visiting our website");
  };

  return (
    <Container>
      {productList?.length ? (
        productList?.map((product) => {
          return (
            <Row
              className="mb-5 shadow-sm  product_row"
              key={product?.product_id}
            >
              <p className="m-0  p-0 px-3 flexCenter">
                <AiOutlineClose
                  className="ms-auto cursor"
                  onClick={() => handleRemove(product?.product_id)}
                />
              </p>
              <Col className="flexGrid col-4">
                <img
                  src={product?.image}
                  alt="Product-image"
                  className="img-fluid product_img"
                />
              </Col>
              <Col className="col-8">
                <div>
                  <h1>{(product?.title).substring(0, 20)}</h1>
                  <span>Rs. {product?.price}</span>
                  <p>
                    Total:{" "}
                    {quantities[product?.product_id] * product?.price ||
                      product?.price}
                  </p>
                  <div className="mb-3" key={product?.product_id}>
                    <button
                      className="custom-counter"
                      disabled={product?.qty === 0 ? true : false}
                      onClick={() => handleDecrement(product?.product_id)}
                    >
                      -
                    </button>
                    <button
                      className="custom-counter "
                      style={{ backgroundColor: "white" }}
                    >
                      {quantities[product?.product_id] || 1}
                    </button>
                    <button
                      className="custom-counter "
                      onClick={() => handleIncrement(product?.product_id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          );
        })
      ) : (
        <div className="flexCenter" style={{ flexDirection: "column" }}>
          <BsCart style={{ fontSize: "100px" }} />
          <Link to="/" className="mt-5">
            <button className="btn btn-outline-dark">Go to Shopping</button>
          </Link>
        </div>
      )}

      {productList?.length ? (
        <div className="px-5 flexSB subtotal_container py-3 mb-5">
          <p className="p-0 m-0 ms-auto">
            <span className="p-0 m-0 text-uppercase font-weight-bolder">
              SubTotal
            </span>
            : Rs. {subtotal ? Math.floor(subtotal) : 0}
          </p>
        </div>
      ) : null}
      {productList?.length === 0 ? null : (
        <div className="text-center">
          <button className="btn btn-outline-dark" onClick={handleProceed}>
            Proceed To Checkout
          </button>
        </div>
      )}
    </Container>
  );
};

export default ProductCard;
