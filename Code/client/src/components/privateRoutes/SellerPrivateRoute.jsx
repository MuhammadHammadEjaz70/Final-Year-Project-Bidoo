import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

import LoadingToRedirect from "./LoadingToRedirect";

const SellerPrivateRoute = () => {
  const { seller } = useSelector((state) => ({ ...state }));

  return seller && seller.token ? <Outlet /> : <LoadingToRedirect />;
};

export default SellerPrivateRoute;
