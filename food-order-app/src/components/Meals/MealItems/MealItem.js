import { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context"
const MealItem = (props) => {
    const cartCTX = useContext(CartContext);
    const price = `$${props.meal.price.toFixed(2)}`;
    const onAddCartHandler = (amount) => {
        cartCTX.addItem({
            id: props.meal.id,
            name: props.meal.name,
            amount: amount,
            price: props.meal.price
        });
    }
    return (
        <li className={classes.meal}>
            <div>
                <div className={classes.name}>{props.meal.name}</div>
                <div className={classes.description}>{props.meal.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.meal.id} AddToCart={onAddCartHandler} />
            </div>
        </li>
    );
};

export default MealItem;
