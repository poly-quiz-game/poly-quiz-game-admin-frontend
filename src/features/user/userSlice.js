import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";

const initialState = {
  loading: true,
  users: [],
  total: 0,
  user: {},
  report: [],
  reportDetail: {},
};

export const fetchUser = createAsyncThunk(
  "user/getUser",
  async ({ offset, limit, search, sortField, sortDirection }) => {
    return await userApi.getAll({
      offset,
      limit,
      search,
      sortField,
      sortDirection,
    });
  }
);

export const fetchReportQuizDetail = createAsyncThunk(
  "user/getReportQuizDetail",
  async (id) => {
    return await userApi.getReportQuizzes(id);
  }
);

export const add = createAsyncThunk("user/addUser", async (user) => {
  const { data } = await userApi.add(user);
  return data;
});

export const update = createAsyncThunk("user/userUpdate", async (user) => {
  const { data } = await userApi.update(user);
  return data;
});

export const userDetail = createAsyncThunk("user/userDetail", async (id) => {
  const { data } = await userApi.getOne(id);
  return data;
});

export const userReportDetail = createAsyncThunk(
  "user/userReportDetail",
  async (id) => {
    return await userApi.getReportDetail(id);    
  }
);

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
    addCase(fetchReportQuizDetail.pending, (state) => {
      state.loading = true;
    });
    addCase(userReportDetail.pending, (state) => {
      state.loading = true;
    });
    addCase(add.pending, (state) => {
      state.loading = true;
    });
    addCase(update.pending, (state) => {
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
      state.users = action.payload.data;
      state.total = action.payload.total;
    });
    addCase(fetchReportQuizDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.report = action.payload;
    });
    addCase(add.fulfilled, (state) => {
      state.loading = false;
    });
    addCase(update.fulfilled, (state) => {
      state.loading = false;
    });
    addCase(userDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    addCase(userReportDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.reportDetail = action.payload;
    });
    addCase(remove.fulfilled, (state) => {
      state.loading = false;
    });
    //rejected
    addCase(fetchUser.rejected, (state) => {
      state.loading = false;
    });
    addCase(fetchReportQuizDetail.rejected, (state) => {
      state.loading = false;
    });
    addCase(add.rejected, (state) => {
      state.loading = false;
    });
    addCase(update.rejected, (state) => {
      state.loading = false;
    });
    addCase(remove.rejected, (state) => {
      state.loading = false;
    });
    addCase(userDetail.rejected, (state) => {
      state.loading = false;
    });
    addCase(userReportDetail.rejected, (state) => {
      state.loading = false;
    }
    );
  },
});

// Selectors
export const selectUserList = (state) => state.user.users;
export const selectUserDetail = (state) => state.user.user;
export const selectLoading = (state) => state.user.loading;
export const selectUserTotal = (state) => state.user.total;
export const selectReport = (state) => state.user.report;
export const selectReportDetail = (state) => state.user.reportDetail;

// Reducer
const userReducer = userSlice.reducer;
export default userReducer;
