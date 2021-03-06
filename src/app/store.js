import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import questionTimeReducer from "../features/questionTime/questionTimeSlice";
import questionTypeReducer from "../features/questionType/questionTypeSlice";
import quizReducer from "../features/quiz/quizSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    questionType: questionTypeReducer,
    questionTime: questionTimeReducer,
    dashboard: dashboardReducer,
    quizzes: quizReducer,
  },
});
