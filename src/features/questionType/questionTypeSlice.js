import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import questionTypeApi from "../../api/questionType";
import questionTimeApi from "../../api/questionTime";

const initialState = {
  loading: true,
  questionType: [],
  questionTime: [],
};

export const fetchQuestiontype = createAsyncThunk(
  "questionType/getQuestionType",
  async () => {
    const { data } = await questionTypeApi.getAll();
    return data;
  }
);

export const update = createAsyncThunk(
  "questionType/questionTypeUpdate",
  async (questionType) => {
    const { data } = await questionTypeApi.update(questionType);
    return data;
  }
);

export const fetchQuestionTime = createAsyncThunk(
  "questionType/getQuestionTime",
  async () => {
    const { data } = await questionTimeApi.getAll();

    return data.map((item) => ({ ...item, value: item.value / 1000 }));
  }
);

export const updateTime = createAsyncThunk(
  "questionType/questionTimeUpdate",
  async (questionTime) => {
    const { data } = await questionTimeApi.update({
      ...questionTime,
      value: questionTime.value * 1000,
    });
    return data;
  }
);

const questionTypeSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    //pending
    addCase(fetchQuestiontype.pending, (state) => {
      state.loading = true;
    });
    addCase(update.pending, (state) => {
      state.loading = true;
    });
    //fulfilled
    addCase(fetchQuestiontype.fulfilled, (state, action) => {
      state.loading = false;
      state.questionType = action.payload;
    });
    addCase(fetchQuestionTime.fulfilled, (state, action) => {
      state.loading = false;
      state.questionTime = action.payload;
    });
    addCase(update.fulfilled, (state, action) => {
      state.loading = false;
    });
    //rejected
    addCase(fetchQuestiontype.rejected, (state) => {
      state.loading = false;
    });
    addCase(update.rejected, (state) => {
      state.loading = false;
    });
  },
});
// Selectors
export const selectQuestionTypeList = (state) =>
  state.questionType.questionType;
export const selectQuestionTimeList = (state) =>
  state.questionType.questionTime;
// export const selectUserDetail = (state) => state.user.user;
export const selectLoading = (state) => state.questionType.loading;

// Reducer
const questionTypeReducer = questionTypeSlice.reducer;
export default questionTypeReducer;
