import React from "react";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import User from "./pages/User";
import UserQuizz from "./pages/UserQuizz";
import UserReport from "./pages/UserReport";

const UserFeature = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="add" element={<Add />} />
        <Route path=":id/quiz-user" element={<UserQuizz />} />
        <Route path=":id/quiz-report" element={<UserReport />} />
      </Routes>
    </div>
  );
};

export default UserFeature;
