import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Products from "./containers/products";
import React from "react";
import LogIn from "./containers/login";
// import { Provider } from "react-redux";
// import store from "./redux/store/store";
import Orders from "./containers/orders";
import Checkout from "./containers/checkout";
import SignUp from "./containers/signup";
import Thankyou from "./containers/thankyou";

const AppComponentRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thankyou" element={<Thankyou />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default AppComponentRouter;
