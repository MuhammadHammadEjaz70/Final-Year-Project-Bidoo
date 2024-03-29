import React from "react";
import { Link } from "react-router-dom";

export const AdminNavigation = () => {
  return (
    <>
      <div>
        <nav>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/products">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/admin/category">
                Category
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/sub">
                Sub Category
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/user/password">
                Password
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
