import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import quizApi from "../../api/quizApi";

const initialState = {
  loading: true,
  quizzes: [],
};

export const quizDetail = createAsyncThunk("quiz/quizDetail", async (id) => {
  const { data } = await quizApi.getOne(id);
  return data;
});

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    //pending
    addCase(quizDetail.pending, (state) => {
      state.loading = true;
    });
    //fulfilled
    addCase(quizDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.quizzes = action.payload;
    });
    //rejected
    addCase(quizDetail.rejected, (state) => {
      state.loading = false;
    });
  },
});

// Selectors
export const selectQuizDetail = (state) => state.quizzes.quizzes;

// Reducer
const quizReducer = quizSlice.reducer;
export default quizReducer;
