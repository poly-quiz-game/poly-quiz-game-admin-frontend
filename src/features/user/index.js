import React from "react";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import User from "./pages/User";

const UserFeature = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="add" element={<Add />} />
        <Route path=":id/edit" element={<Edit />} />
      </Routes>
    </div>
  );
};

export default UserFeature;
