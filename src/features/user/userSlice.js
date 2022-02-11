import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";
import userApi from "../../api/userApi";

const initialState = {
  loading: true,
  users: [],
  user: {},
};

export const fetchUser = createAsyncThunk("user/getUser", async () => {
  const { data } = await userApi.getAll();
  return data;
});

export const add = createAsyncThunk("user/addUser", async (user) => {
  const { data } = await userApi.add(user);
  return data;
});

export const userDetail = createAsyncThunk("user/userDetail", async (id) => {
  const { data } = await userApi.getOne(id);
  return data;
});

export const remove = createAsyncThunk("user/remove", async (id) => {
  const { data } = await userApi.delete(id);
  return data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    //pending
    addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    addCase(add.pending, (state) => {
      state.loading = true;
    });
    addCase(remove.pending, (state) => {
      state.loading = true;
    });
    addCase(userDetail.pending, (state) => {
      state.loading = true;
    });
    //fulfilled
    addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    addCase(add.fulfilled, (state) => {
      state.loading = false;
    });
    addCase(userDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    addCase(remove.fulfilled, (state) => {
      state.loading = false;
    });
    //rejected
    addCase(fetchUser.rejected, (state) => {
      state.loading = false;
    });
    addCase(add.rejected, (state) => {
      state.loading = false;
    });
    addCase(remove.rejected, (state) => {
      state.loading = false;
    });
    addCase(userDetail.rejected, (state) => {
      state.loading = false;
    });
  },
});

// Actions
// export const quizActions = quizSlice.actions;

// Selectors
export const selectUserList = (state) => state.user.users;
export const selectUserDetail = (state) => state.user.user;
export const selectLoading = (state) => state.user.loading;

// Reducer
const userReducer = userSlice.reducer;
export default userReducer;
