import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

import LoadingToRedirect from "./LoadingToRedirect";

const UserPrivateRoute = () => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? <Outlet /> : <LoadingToRedirect />;
};

export default UserPrivateRoute;
