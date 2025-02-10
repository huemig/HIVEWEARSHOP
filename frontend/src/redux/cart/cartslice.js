import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

const api = new API();
const initialState = {
  items: [],
  error: null,
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  try {
    const res = await api.getGlitchCarts();
    return res;
  } catch (error) {
    return error;
  }
});
export const agregar = createAsyncThunk(
  "cart/agregar",
  async ({ product, quantity }, { rejectWithValue }) => {
    try {
      if (!product || typeof product !== "number") {
        console.error("Invalid product value before sending request:", product);
        throw new Error("Invalid product ID");
      }
      if (!quantity || typeof quantity !== "number") {
        console.error(
          "Invalid quantity value before sending request:",
          quantity
        );
        throw new Error("Invalid quantity value");
      }

      const response = await api.addGlitchCart(product, quantity);
      return response;
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response ? error.response.data : error.message
      );
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);


export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ quantity, product }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.updateCart(quantity, product);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const emptyCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const {
        cart: { items },
      } = getState();
      await Promise.all(
        items.map((item) =>
          dispatch(updateCart({ quantity: 0, product: item.id }))
        )
      );
      return [];
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    deleteCart: (state, action) => {
      state.items = state.items.filter((cart) => cart.id !== action.payload);
      state.error = null;
    },
  },
  error: null,
  extraReducers(builder) {
    builder
      .addCase(agregar.fulfilled, (state, action) => {
        state.items = Array.isArray(action.payload) ? action.payload : [];

        state.error = null;
      })
      .addCase(agregar.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(agregar.pending, (state, action) => {
        console.log(`this from pending ${action.payload}`);
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload || [];
        state.error = null;
      })
      .addCase(fetchCart.pending, (state, action) => {})
      .addCase(updateCart.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.error = null;
      })

      .addCase(updateCart.rejected, (state, action) => {
        state.error = action.error.message;
        console.error("Update failed");
      })
      .addCase(emptyCart.fulfilled, (state, action) => {
        state.items = initialState;
        state.error = null;
      });
  },
});

export const { deleteCart } = cartSlice.actions;
export default cartSlice.reducer;

// const getTotalCartPrice = (carts) => {
//     if (carts.length > 0) {
//         const totalPrice = carts.reduce((prev, cur) => prev + cur.total_price, 0);
//         return +totalPrice.toFixed(2);
//     }
//     return 0;
// };

// const getTotalCartItems = (carts) => {
//     if (carts.length > 0) {
//         const totalCartItems = carts.reduce((prev, cur) => prev + cur.quantity, 0);
//         return totalCartItems;
//     }
//     return 0;
// };

//this option #A plan #A   works well but cannot bckspce cannot add product already in cart

// export const agregar = createAsyncThunk(
//     'cart/agregar',
//     async ({ product, quantity }, { rejectWithValue }) => {
//       try {
//         const response = await api.agregar(product, quantity);
//         return response.data;
//       } catch (error) {
//         // Return a rejected value with the error message
//         return rejectWithValue(error.response ? error.response.data : error.message);
//       }
//     }
//   );

// optiion #2 Plan #B

// export const agregar = createAsyncThunk(
//     'cart/agregar',
//     async ({ product, quantity }, { rejectWithValue }) => {
//       try {
//         console.log(`Adding product: ${product} with quantity: ${quantity}`);
//         const response = await api.agregar(product, quantity);
//         console.log('API response:', response);
//         return response.data;
//       } catch (error) {
//         console.error('Error adding to cart:', error);
//         // Return a rejected value with the error message
//         return rejectWithValue(error.response ? error.response.data : error.message);
//       }
//     }
//   );

//this is option#C plan #C

// export const addProductToCart = createAsyncThunk(
//     'cart/addProductToCart',
//     async ({ productId, quantity }, { rejectWithValue, getState }) => {
//         try {
//             const state = getState();
//             const existingCartItem = state.cart.items.find(item => item.product.id === productId);

//             if (existingCartItem) {
//                 // If the item already exists in the cart, update its quantity
//                 const newQuantity = existingCartItem.quantity + quantity;
//                 await api.updateCartItemQuantity(existingCartItem.id, newQuantity);
//             } else {
//                 // Otherwise, add the new item to the cart
//                 await api.addProductToCart(productId, quantity);
//             }

//             // Fetch updated cart data
//             dispatch(fetchCart());
//         } catch (error) {
//             throw error;
//         }
//     }
// );
//with THESE CHNAGES IF DOES NOT WORK

// const existingCartItem = state.cart.items.find(item => item.product.id === productId);

// if (existingCartItem) {
//   // If the item already exists in the cart, update its quantity
//   const newQuantity = existingCartItem.quantity + quantity;
//   await api.updateCartItemQuantity(existingCartItem.id, newQuantity);
// } else {
//   // Otherwise, add the new item to the cart
//   await api.addProductToCart(productId, quantity);
// }

// const handleAddToCart = (product) => {
//     const existingCartItem = cartItems.find(item => item.product.id === product.id);
//     const quantityToAdd = existingCartItem ? existingCartItem.quantity + 1 : 1;
//     dispatch(addProductToCart({ productId: product.id, quantity: quantityToAdd }));
// };

//les optimized than option #A
// export const agregar = createAsyncThunk(
//     'cart/agregar',
//     async ({ productId, quantity }, { rejectWithValue }) => {
//         try {
//             const response = await addGlitchCart(productId, quantity);
//             return { productId, quantity };
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );
// MOAB

// export const agregar = createAsyncThunk('cart/agregar', async ({ product, quantity }, { rejectWithValue, getState }) => {
//     try {
//       const state = getState();
//       const existingCartItem = state.cart.items.find(item => item.product.id === product);

//       if (existingCartItem) {
//         // If the item already exists in the cart, update its quantity
//         const newQuantity = existingCartItem.quantity + quantity;
//         await api.updateCart(existingCartItem.id, newQuantity);
//       } else {
//         // Otherwise, add the new item to the cart
//         await api.agregar(product, quantity);
//       }

//       // Fetch updated cart data
//       return await api.getGlitchCarts().then(response => response.data);
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   });
