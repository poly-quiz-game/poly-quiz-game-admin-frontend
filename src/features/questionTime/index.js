import React from "react";
import { Route, Routes } from "react-router-dom";
import Add from "./page/Add";
import QuestionTime from "./page/QuestionTime";

const QuestionTimeFeature = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<QuestionTime />} />
        <Route path="add" element={<Add />} />
      </Routes>
    </div>
  );
};

export default QuestionTimeFeature;
