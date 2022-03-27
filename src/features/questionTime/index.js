import React from "react";
import { Route, Routes } from "react-router-dom";
import QuestionTime from "./page/QuestionTime";

const QuestionTimeFeature = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<QuestionTime />} />
      </Routes>
    </div>
  );
};

export default QuestionTimeFeature;
