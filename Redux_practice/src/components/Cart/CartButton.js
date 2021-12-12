import classes from "./CartButton.module.css";
import { uiActions } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalqty = useSelector((state) => state.cart.totalQuantity);
  const togglerHandler = () => {
    dispatch(uiActions.toggle());
  };
  return (
    <button className={classes.button} onClick={togglerHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalqty}</span>
    </button>
  );
};

export default CartButton;
