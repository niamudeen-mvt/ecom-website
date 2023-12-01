import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { sendNotification } from "../utils/notifications";
import Loader from "../components/loader";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { addToCart } from "../services/api/products";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/actions/productAction";

const Product = () => {
  const { id } = useParams();
  const { userId, refreshList, setRefreshList } = useLocalStorage();

  const productList = useSelector((state) => state?.products);

  const product = (productList?.filter(
    (product) => product?.product_id == id
  ))[0];

  console.log(product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleAddtoCart = async (product) => {
    if (userId === null) {
      sendNotification("warning", "Please Login to Proceed");
    } else {
      const { id: product_id, ...rest } = product;
      let res = await addToCart({ userId, product_id, ...rest });
      if (res?.status === 201) {
        sendNotification("success", res?.data?.message);
        setRefreshList(!refreshList);
      } else {
        sendNotification("warning", res?.response?.data?.message);
      }
    }
  };

  return (
    <>
      {Object.keys(product).length === 0 ? (
        <Loader />
      ) : (
        <section className="common_section">
          <Container>
            <Row key={product?.id}>
              <Col className="col-10 col-md-6 m-auto mb-5 ">
                <div className="flexCenter">
                  <img
                    src={product?.image}
                    alt="product-img"
                    style={{ width: "80%" }}
                  />
                </div>
              </Col>
              <Col className="col-10 col-md-6 ">
                <div>
                  <h4 className="text-uppercase text-black-50">
                    {product?.category}
                  </h4>
                  <h1>{product?.title}</h1>
                  <h3>Rs. {product?.price}</h3>
                  <p>{product?.description}</p>
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => handleAddtoCart(product)}
                  >
                    Add to Cart
                  </button>
                  <Link to="/cart">
                    <button className="btn btn-dark mx-3 ">Go to Cart</button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </>
  );
};

export default Product;
