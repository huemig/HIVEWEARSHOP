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

export default class API {
  signUp = (signUpBody) => {
    const formData = new FormData();

    for (const key in signUpBody) {
      formData.append(key, signUpBody[key]);
    }

    return api.post("/users/signup/", formData);
  };

  signIn = async (signInBody) => {
    try {
      const formData = new FormData();
      for (const key in signInBody) {
        formData.append(key, signInBody[key]);
      }
      const response = await api.post("/users/signin/", formData);
      return response.data; // Ensure you return the expected structure
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed"); // Provide a meaningful error
    }
    // const formData = new FormData();
    // for (const key in signInBody) {
    //   formData.append(key, signInBody[key]);
    // }
    // return api.post("/users/signin/", formData);
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

  getGlitchCarts = async (query = {}) => {
    try {
      const response = await api.get("/cart/", {
        params: query,
        requireToken: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching cart", error);
      return [];
    }
  };

  addGlitchCart = async (product, quantity) => {
    const formData = new FormData();
    formData.append("product", product);
    formData.append("quantity", quantity);
    try {
      const response = await api.post(
        "/cart/add/",
        formData,
        { requireToken: true },
        {
          headers: {
            "Content-Type": "multipart/form-data", // 💡 Ensure backend knows it's FormData
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Cart Error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Cart failed");
    }
  };
  // addGlitchCart = async (product, quantity) => {
  //   return api.post(
  //     "/cart/add/",
  //     { product, quantity }, // Send JSON instead of FormData
  //     { requireToken: true }
  //   );
  // };
  // addGlitchCart = async (product, quantity) => {
  //   console.log("🔵 Sending API Request to add to cart:", {
  //     product,
  //     quantity,
  //   });

  //   if (!product || typeof product !== "number") {
  //     console.error(
  //       "🛑 Invalid product value before sending request:",
  //       product
  //     );
  //     throw new Error("Invalid product ID");
  //   }
  //   if (!quantity || typeof quantity !== "number") {
  //     console.error(
  //       "🛑 Invalid quantity value before sending request:",
  //       quantity
  //     );
  //     throw new Error("Invalid quantity value");
  //   }

  //   try {
  //     const formData = new FormData();
  //     formData.append("product", product);
  //     formData.append("quantity", quantity);
  //     return await api.post("/cart/add/", formData, { requireToken: true });
  //   } catch (error) {
  //     console.error(
  //       "❌ API Error:",
  //       error.response ? error.response.data : error.message
  //     );
  //     throw error;
  //   }
  // };

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
