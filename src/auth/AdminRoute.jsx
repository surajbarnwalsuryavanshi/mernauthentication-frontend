import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuth } from "./Helpers";

const AdminRoute = () => {
  const user = isAuth();
  return user && user.role === "admin" ? <Outlet /> : <Navigate to="/signin" replace />;
  
};

export default AdminRoute;