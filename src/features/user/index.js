import React from "react";
import { Route, Routes } from "react-router-dom";
import User from "./pages/User";
import UserQuizz from "./pages/UserQuizz";
import UserReport from "./pages/UserReportDetailQuiz";
import UserQuizzDetail from "./pages/UserDetailQuizz";
import DetailReportPlayer from "./pages/DetailReportPlayer";
import DetailReportQuestion from "./pages/DetailReportQuestion";

const UserFeature = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path=":id/quiz-user" element={<UserQuizz />} />
        <Route path=":id/quiz-user/:quizId/:email" element={<UserQuizzDetail />} />
        <Route path=":id/quiz-user/:quizId/:email/quiz-report" element={<UserReport />} />
        <Route path=":id/quiz-user/:quizId/:email/:reportId/detail-report/player" element={<DetailReportPlayer />} />
        <Route path=":id/quiz-user/:quizId/:email/:reportId/detail-report/question" element={<DetailReportQuestion />} />
      </Routes>
    </div>
  );
};

export default UserFeature;
