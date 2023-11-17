import { atom } from "jotai";
import { selectAtom, splitAtom } from "jotai/utils";
import { focusAtom } from "jotai-optics";
import { cloneDeep } from "lodash-es";
import deepEqual from "fast-deep-equal";
import cartJson from "../../cart.json";

const cartAtom = atom(cartJson);

export const updateCartAtom = atom(null, (get, set) => {
  set(cartAtom, (cart) => {
    return cloneDeep(cart);
  });
});
export const deliveryAtom = selectAtom(cartAtom, (cart) => cart.deliveries);
export const paymentsAtom = selectAtom(cartAtom, (cart) => cart.payments);
export const cartItemsAtom = focusAtom(cartAtom, (optic) =>
  optic.prop("cartItems")
);
export const cartItemIdsAtom = selectAtom(
  cartAtom,
  (cart) => cart.cartItems.map((item) => item.id),
  deepEqual
);

export const addItemAtom = atom(null, (get, set) => {
  set(cartItemsAtom, (cartItems) => {
    const lastItem = cartItems[cartItems.length - 1];
    if (!lastItem) {
      return [
        {
          id: 1,
          title: `cart-items title 1`,
          amount: 5,
          price: 100
        }
      ];
    }
    const newCartItems = cartItems.concat({
      id: lastItem.id + 1,
      title: `cart-items title ${lastItem.id + 1}`,
      amount: 5,
      price: 100
    });
    return newCartItems;
  });
});

export const removeItemAtom = atom(null, (_, set, update) => {
  set(cartItemsAtom, (cartItems) => {
    return cartItems.filter((item) => item.id !== update);
  });
});

export const totalAtom = selectAtom(cartItemsAtom, (cartItems) => {
  const total = cartItems.reduce((acc, cur) => {
    return acc + cur.price * cur.amount;
  }, 0);
  return total;
});
