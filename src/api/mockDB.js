import cartJson from "../cart.json";
import { cloneDeep } from "lodash-es";

const mockDB = cloneDeep(cartJson);

export const updateDB = (item) => mockDB.cartItems.push(item);

export default mockDB;
