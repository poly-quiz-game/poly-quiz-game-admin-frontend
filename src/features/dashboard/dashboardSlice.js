import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardApi from "../../api/dashboardApi";

const initialState = {
  loading: true,
  dashboard: [],
};

export const fetchDashboard = createAsyncThunk(
  "dashboard/getdashboard",
  async ({start, end}) => {
    const { data } = await dashboardApi.getAll({start, end});
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
    //rejected
    addCase(fetchDashboard.rejected, (state) => {
      state.loading = false;
    });
  },
});
// Selectors
export const selectDashboardList = (state) => state.dashboard.dashboard;
export const selectLoading = (state) => state.dashboard.loading;

// Reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
