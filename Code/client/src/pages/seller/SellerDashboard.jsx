import React, { useEffect, useState } from "react";
import SellerNavigation from "../../components/nav/SellerNavigation"

export const SellerDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <SellerNavigation />
        </div>
        <div className="col">
          <h4>Seller Dashboard</h4>
        </div>
      </div>
    </div>
  );
};
