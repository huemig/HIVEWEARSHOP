import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import AppComponentRouter from "./approuter";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AppComponentRouter>
      <App />
    </AppComponentRouter>
  </Provider>
);
