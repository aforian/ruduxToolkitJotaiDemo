import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import toastsReducer from "./toast";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    toasts: toastsReducer
  },
  devTools: true
});
