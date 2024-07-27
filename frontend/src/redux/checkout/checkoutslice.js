import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";
import { emptyCart } from "../cart/cartslice";

const api = new API();
//dispatch empty cart getordrer
export const addOrder = createAsyncThunk(
  "checkout/addOrder",
  async (checkoutOrderBody, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.checkoutOrder(checkoutOrderBody);
      dispatch(emptyCart());
      return response.data;
    } catch (error) {
      console.log("add order error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrdrer = createAsyncThunk(
  "checkout/getOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = api.viewOrder();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const checkoutSLice = createSlice({
  name: "checkout",
  initialState: {
    items: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdrer.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(getOrdrer.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.error = action.payload;
        console.log("add order rejected:", action.payload);
      });
  },
});

export default checkoutSLice.reducer;
