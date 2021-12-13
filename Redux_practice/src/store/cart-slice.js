import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItem(state, action) {
      const newItem = action.payload;

      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          qty: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        });
      } else {
        existingItem.qty++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.qty === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.qty--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});
// complex :/
export const fetchCart = () => {
  return async (dispatch) => {
    const fetchdata = async () => {
      const res = await fetch(
        "https://cart-9e3a0-default-rtdb.firebaseio.com/Cart.json"
      );
      const data = await res.json();
      return data;
    };
    try {
      const cartData = await fetchdata();
      dispatch(
        cartAction.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNoti({
          status: "fetch error",
          title: "Error..",
          msg: "fetch task Failed..",
        })
      );
    }
  };
};

export const sendCartdata = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNoti({
        status: "pending.",
        title: "Sending..",
        msg: "please wait..",
      })
    );

    const sendReq = async () => {
      const response = await fetch(
        "https://cart-9e3a0-default-rtdb.firebaseio.com/Cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("failed");
      }
    };
    try {
      await sendReq();
      dispatch(
        uiActions.showNoti({
          status: "success",
          title: "success..",
          msg: "saved.",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNoti({
          status: "error",
          title: "Error..",
          msg: "task Failed..",
        })
      );
    }
  };
};

export const cartAction = cartSlice.actions;
export default cartSlice;
