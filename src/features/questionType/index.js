import React from "react";
import { Route, Routes } from "react-router-dom";
import QuestionType from "./pages/QuestionType";

const QuestionTypeFeature = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<QuestionType />} />
      </Routes>
    </div>
  );
};

export default QuestionTypeFeature;
