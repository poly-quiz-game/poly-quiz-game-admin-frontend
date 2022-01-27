import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";

let user;
try {
  user = JSON.parse(localStorage.getItem("user")) || {};
} catch {
  user = {};
}

const initialState = {
  token: localStorage.getItem("access_token") || "",
  user,
  isLoggedIn: false,
  logging: false,
};

export const login = createAsyncThunk("auth/login", async (payload) => {
  return await authApi.login(payload);
});

export const logout = createAsyncThunk("auth/logout", async () => {
  return await authApi.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(login.pending, (state) => {
      state.logging = true;
    });
    addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.logging = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    addCase(logout.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.user = {};
      state.token = "";
    });
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLogging = (state) => state.auth.logging;
export const selectToken = (state) => state.auth.token;
export const selectUser = (state) => state.auth.user;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
