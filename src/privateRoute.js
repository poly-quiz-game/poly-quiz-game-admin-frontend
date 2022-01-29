import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "./api/axiosClient";

const PrivateRoute = ({ children }) => {
  const token = getToken();
  const user = JSON.parse(localStorage.getItem("user"));

  if (token && user.role === 'admin') {
    return children;
  }
  return <Navigate to="/auth/login" />;
};
export default PrivateRoute;
