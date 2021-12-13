import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartdata } from "./store/cart-slice";
import { fetchCart } from "./store/cart-slice";

let isinit = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  useEffect(() => {
    if (isinit) {
      isinit = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartdata(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.msg}
        />
      )}
      <Layout>
        {showCart && <Cart />} <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
