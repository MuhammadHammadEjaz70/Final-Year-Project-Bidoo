import React from "react";
import { Link } from "react-router-dom";

const SellerNavigation = () => {
  return (
    <div>
      <nav>
        <ul className="nav flex-column ">
          <li className="nav-item ">
            <Link className="nav-link text-dark" to="/seller/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link text-dark" to="/seller/product">
              New Product
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link text-dark" to="/seller/products">
              Products
            </Link>
          </li>

          <li className="nav-item ">
            <Link className="nav-link text-dark " to="/user/password">
              Password
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SellerNavigation;
