import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { currentAdmin } from "../../functions/auth.functions";
import LoadingToRedirect from "./LoadingToRedirect";

const AdminPrivateRoute = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("Current admin response", res);
          setAdmin(true);
        })
        .catch((error) => {
          console.log("admin route mein error hai", error);
           setAdmin(false);
        });
    }
  }, [user]);

  return admin ? <Outlet /> : <LoadingToRedirect />;
};

export default AdminPrivateRoute;
