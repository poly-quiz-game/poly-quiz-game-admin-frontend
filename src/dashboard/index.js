import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./page/Dashboard";

const DashboardFeature = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default DashboardFeature;
