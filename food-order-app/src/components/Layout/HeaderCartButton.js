import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "./CartIcon";
import classes from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
    const [btnAnimation, setBtnaAnimation] = useState(false);

    const cartCTX = useContext(CartContext);

    const noOfItem = cartCTX.items.reduce((currNumber, item) => {
        return currNumber + item.amount;
    }, 0);
    const btnClass = `${classes.button} ${btnAnimation ? classes.bump : ""}`;
    useEffect(() => {
        if (cartCTX.items.length === 0) return;
        setBtnaAnimation(true);
        const timer = setTimeout(() => {
            setBtnaAnimation(false);
        }, 200);
        return () => {
            clearTimeout(timer);
        };
    }, [cartCTX.items]);
    return (
        <button className={btnClass} onClick={props.onCartClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Cart</span>
            <span className={classes.badge}>{noOfItem}</span>
        </button>
    );
};

export default HeaderCartButton;
