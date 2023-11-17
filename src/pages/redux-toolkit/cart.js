import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash-es";
import cartJson from "../../cart.json";

export const cartSlice = createSlice({
  name: "cart",
  initialState: cloneDeep(cartJson),
  reducers: {
    addItem: (state) => {
      const prevCartItems = state.cartItems;
      const lastItem = prevCartItems[prevCartItems.length - 1];
      if (!lastItem) {
        state.cartItems.push({
          id: 1,
          title: `cart-items title 1`,
          amount: 5,
          price: 100
        });
        return;
      }
      const newCartItems = prevCartItems.concat({
        id: lastItem.id + 1,
        title: `cart-items title ${lastItem.id + 1}`,
        amount: 5,
        price: 100
      });
      state.cartItems = newCartItems;
    },
    updateAllCart: (state) => {
      const newCartItems = state.cartItems;
      state.cartItems = cloneDeep(newCartItems);
      state.deliveries = cloneDeep(cartJson).deliveries;
      state.payments = cloneDeep(cartJson).payments;
    },
    removeItem: (state, action) => {
      const targetId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== targetId);
    }
  }
});

// Action creators are generated for each case reducer function
export const { addItem, updateAllCart, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
