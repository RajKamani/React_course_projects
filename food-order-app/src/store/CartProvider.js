import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};
const CartReducer = (state, action) => {
    if (action.type === "ADD_ITEM") {
        const updatedAmt =
            state.totalAmount + action.item.price * action.item.amount;

        const existingItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        const exitstingItem = state.items[existingItemIndex];
        let updatedItem;
        let updatedItems;
        if (exitstingItem) {
            updatedItem = {
                ...exitstingItem,
                amount: exitstingItem.amount + action.item.amount,
            };
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }
        return {
            items: updatedItems,
            totalAmount: updatedAmt,
        };
    }
    if (action.type === "DEL_ITEM") {
        const existingItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const exitstingItem = state.items[existingItemIndex];
        const updatedAmt = state.totalAmount - exitstingItem.price;
        let updatedItems;
        if (exitstingItem.amount === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.id);
        } else {
            const updatedItem = {
                ...exitstingItem,
                amount: exitstingItem.amount - 1,
            };
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedAmt,
        };
        console.log(action.id);
    }
};

const CartProvider = (props) => {
    const [cartState, setCartState] = useReducer(CartReducer, defaultCartState);
    const addCartItemHandler = (item) => {
        setCartState({
            type: "ADD_ITEM",
            item: item,
        });
    };
    const removeCartItemHandler = (id) => {
        setCartState({
            type: "DEL_ITEM",
            id: id,
        });
    };
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addCartItemHandler,
        remItem: removeCartItemHandler,
    };
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
