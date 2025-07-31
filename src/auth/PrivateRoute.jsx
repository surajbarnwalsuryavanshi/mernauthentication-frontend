import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuth } from "./Helpers";

const PrivateRoute = () => {
  return isAuth() ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute