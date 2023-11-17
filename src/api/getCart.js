import { cloneDeep } from "lodash-es";
import mockDB from "./state";

const getCart = () => {
  return new Promise((res, rej) => {
    setTimeout(() => res(cloneDeep(mockDB)), 2000);
  });
};

export default getCart;
