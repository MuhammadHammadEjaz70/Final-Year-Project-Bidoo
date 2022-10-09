import React from "react";
import { Link } from "react-router-dom";

const UserNavigation = () => {
  return (
    <div>
      <nav>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="/user/history">
              History
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user/password">
              Password
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user/wishlist">
              WishList
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserNavigation;
