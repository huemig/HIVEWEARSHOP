import axios from "axios";

export const LOGIN_USER_KEY = "HIVE_TECHWEAR_LOGIN_USER_KEY";

var baseURL = "http://127.0.0.1:8000/";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (config.requireToken) {
      const user = localStorage.getItem(LOGIN_USER_KEY)
        ? JSON.parse(localStorage.getItem(LOGIN_USER_KEY))
        : null;
      config.headers["Authorization"] = user.token;
    }

    return config;
  },
  (err) => console.error(err)
);

// api.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         console.log("error.response", error);
//         if (error.response.status === 401) {
//             localStorage.removeItem(LOGIN_USER_KEY);
//         }

//         return Promise.reject(error);
//     }
// );

export default class API {
  signUp = (signUpBody) => {
    const formData = new FormData();

    for (const key in signUpBody) {
      formData.append(key, signUpBody[key]);
    }

    return api.post("/users/signup/", formData);
  };

  signIn = async (signInBody) => {
    const formData = new FormData();
    for (const key in signInBody) {
      formData.append(key, signInBody[key]);
    }
    return api.post("/users/signin/", formData);
  };

  getProducts = async () => {
    try {
      const response = await api.get("products/");
      return response.data;
    } catch (error) {
      throw new Error("Error fetching products:", error.message);
    }
  };
  getCategories = () => {
    return api.get("/categories/");
  };

  getGlitchCarts = (query = {}) => {
    return api.get("/cart/", { params: query, requireToken: true });
  };

  addGlitchCart = async (product, quantity) => {
    const formData = new FormData();
    formData.append("product", product);
    formData.append("quantity", quantity);
    return api.post("/cart/add/", formData, { requireToken: true });
  };

  updateCart = (quantity, product) => {
    const formData = new FormData();
    formData.append("quantity", quantity);
    formData.append("product", product);
    return api.put(`/cart/update/${product}/`, formData, {
      requireToken: true,
    });
  };

  // Checkout
  checkoutOrder = (checkoutOrderBody) => {
    return api.post("/orders/add/", checkoutOrderBody, { requireToken: true });
  };
  viewOrder = () => {
    return api.get("/orders/", { requireToken: true });
  };
}
