import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import questionTimeApi from "../../api/questionTime";

const initialState = {
  loading: true,
  questionTime: [],
};

export const fetchQuestionTime = createAsyncThunk(
  "questionTime/getquestionTime",
  async () => {
    const { data } = await questionTimeApi.getAll();
    return data;
  }
);

export const add = createAsyncThunk(
  "questionTime/addQuestionTime", 
  async (questionTime) => {
    const { data } = await questionTimeApi.add(questionTime);
    return data;
});

export const update = createAsyncThunk(
  "questionTime/questionTimeUpdate",
  async (questionTime) => {
    const { data } = await questionTimeApi.update(questionTime);
    return data;
  }
);

export const remove = createAsyncThunk(
  "questionTime/remove",
  async (id) => {
    const { data } = await questionTimeApi.delete(id);
    return data;
});

const questionTimeSlice = createSlice({
  name: "questionTime",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    //pending
    addCase(fetchQuestionTime.pending, (state) => {
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
    //fulfilled
    addCase(fetchQuestionTime.fulfilled, (state, action) => {
      state.loading = false;
      state.questionTime = action.payload;
    });
    addCase(add.fulfilled, (state) => {
      state.loading = false;
    });
    addCase(update.fulfilled, (state) => {
      state.loading = false;
    });
    addCase(remove.fulfilled, (state) => {
      state.loading = false;
    });
    //rejected
    addCase(fetchQuestionTime.rejected, (state) => {
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
  },
});
// Selectors
export const selectQuestionTimeList = (state) =>
  state.questionTime.questionTime;
// export const selectUserDetail = (state) => state.user.user;
export const selectLoading = (state) => state.questionTime.loading;

// Reducer
const questionTimeReducer = questionTimeSlice.reducer;
export default questionTimeReducer;
