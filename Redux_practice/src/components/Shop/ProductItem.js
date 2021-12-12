import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { useDispatch } from "react-redux";
import { cartAction } from "../../store/cart-slice";

const ProductItem = (props) => {
  const dispatch = useDispatch();

  const { name, price, description } = props.newitem;

  const addItemhandler = () => {
    dispatch(cartAction.addItem(props.newitem));
  };
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{name}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addItemhandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;