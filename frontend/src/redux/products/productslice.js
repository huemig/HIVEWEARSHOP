import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API from "../../api";

const api = new API();

const initialState = {
  results: [],
  error: null,
  status: "Idle",
};
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = api.getProducts();
    return res;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export const selectGetProducts = (state) => state.products
// export const selecterr = (state) => state.products.error
// export const selectstatus = (state) => state.products.status

export default productSlice.reducer;
