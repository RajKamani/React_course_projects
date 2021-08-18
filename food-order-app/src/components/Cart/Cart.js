import { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context"
import CartItem from './CartItem'
const Cart = (props) => {

    const cartCTX = useContext(CartContext);
    const onRemoveHandler = (id) => {
        cartCTX.remItem(id);
    }
    const onAddHandler = (item) => {
        cartCTX.addItem({
            id: item.id,
            name: item.name,
            amount: 1,
            price: item.price
        })

    }
    const hasOrder = cartCTX.items.length > 0
    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCTX.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    amount={item.amount}
                    onRemove={onRemoveHandler.bind(null, item.id)}
                    onAdd={onAddHandler.bind(null, item)}

                />
            ))}
        </ul>
    );

    return (
        <Modal onCloseClick={props.onCloseClick}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Price</span>
                <span>${cartCTX.totalAmount.toFixed(2)}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={props.onCloseClick} className={classes['button--alt']}>Close</button>
                {hasOrder && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;
