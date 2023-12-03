import ProductCard from "../../components/card/ProductCard";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Cart = () => {
  const {
    cartList: productList,
    refreshList,
    setRefreshList,
  } = useLocalStorage();
  return (
    <section className="common_section">
      <ProductCard
        productList={productList}
        refreshList={refreshList}
        setRefreshList={setRefreshList}
      />
    </section>
  );
};

export default Cart;
