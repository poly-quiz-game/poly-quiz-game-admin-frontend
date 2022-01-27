import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "./api/axiosClient";

const PrivateRoute = ({ children }) => {
  const token = getToken();
  if (token) {
    return children;
  }
  return <Navigate to="/auth/login" />;
};
export default PrivateRoute;
