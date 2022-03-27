import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardApi from "../../api/dashboardApi";

const initialState = {
  loading: true,
  dashboard: [],
  userTop: []
};

export const fetchDashboard = createAsyncThunk(
  "dashboard/getdashboard",
  async ({start, end}) => {
    const { data } = await dashboardApi.getAll({start, end});
    return data;
  }
);

export const fetchTopUser = createAsyncThunk(
  "topUser/fetchTopUser",
  async () => {
    const data = await dashboardApi.getTop();
    return data;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    //pending
    addCase(fetchDashboard.pending, (state) => {
      state.loading = true;
    });
    //fulfilled
    addCase(fetchDashboard.fulfilled, (state, action) => {
      state.loading = false;
      state.dashboard = action.payload;
    });
    addCase(fetchTopUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userTop = action.payload;
    });
    //rejected
    addCase(fetchDashboard.rejected, (state) => {
      state.loading = false;
    });
  },
});
// Selectors
export const selectDashboardList = (state) => state.dashboard.dashboard;
export const selectLoading = (state) => state.dashboard.loading;
export const selectUserTopList = (state) => state.dashboard.userTop;

// Reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
