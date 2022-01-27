import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

const AuthFeature = (props) => {
  return (
    <Routes>
      <Route path="login" element={<Login {...props} />} />
    </Routes>
  );
};

export default AuthFeature;
