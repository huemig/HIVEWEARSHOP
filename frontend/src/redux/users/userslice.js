import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";
const api = new API();

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
  initialState: {
    user: [],
    loading: false,
    isLoggedin: false,
    error: null,
    loggedInUser: null,
  },
  reducers: {
    logOut: (state, action) => {
      state.user = [];
      state.error = null;
      state.isLoggedin = false;
      state.loading = false;
    },
    updateLoggedInUser: (state, action) => {
      state.isLoggedin = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(auth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.user.loading = false;
        state.user.error = null;
        state.user.isLoggedin = true;
      })
      .addCase(auth.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.error.message;
        state.user.isLoggedin = false;
        console.log(action.payload);
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.loading = false;
        state.error = null;
        state.isLoggedin = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.error.message;
        state.user.isLoggedin = false;
      });
  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
