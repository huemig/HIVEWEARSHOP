import { configureStore } from "@reduxjs/toolkit";
import { LOGIN_USER_KEY } from "../../api";
import userReducer from "../users/userslice";
import { logIn } from "../users/userslice";
import productReducer from "../products/productslice";
import cartReducer from "../cart/cartslice";
import checkoutReducer from "../checkout/checkoutslice";

const authMiddleware = (store) => (next) => (action) => {
  if (action.type === logIn.fulfilled.type) {
    const localUser = action.payload;
    localStorage.setItem(LOGIN_USER_KEY, JSON.stringify(localUser));
    console.log("stored user data", localStorage.getItem(LOGIN_USER_KEY));
  } else if (action.type === "user/logout") {
    JSON.parse(localStorage.removeItem(LOGIN_USER_KEY));
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});
export default store;
