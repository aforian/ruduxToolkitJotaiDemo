import { updateDB } from "./mockDB";

const updateCart = (item) => {
  return new Promise((res, rej) => {
    updateDB(item);
    setTimeout(() => res("success"), 2000);
  });
};

export default updateCart;
