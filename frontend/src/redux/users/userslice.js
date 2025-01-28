import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";
const api = new API();

const initialState = {
  user: null,
  loading: false,
  isLoggedin: false,
  error: null,
};

export const auth = createAsyncThunk("user/auth", async (signUpBody) => {
  const res = await api.signUp(signUpBody);
  return res;
});

export const logIn = createAsyncThunk("user/logIn", async (signInbody) => {
  const res = await api.signIn(signInbody);
  return res;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.user = initialState;
      state.error = null;
      state.isLoggedin = false;
      state.loading = false;
    },
    updateLoggedInUser: (state, action) => {
      state.isLoggedin = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(auth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        state.isLoggedin = true;
      })
      .addCase(auth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isLoggedin = false;
        console.log(action.payload);
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        state.isLoggedin = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isLoggedin = false;
      });
  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
