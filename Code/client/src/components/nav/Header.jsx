import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBInputGroup,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";

import Search from "../froms/Search";
import { LogoutOutlined, ShopOutlined } from "@ant-design/icons";

const Header = (props) => {
  const handleClick = () => {
    // console.log("clicked");
  };

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { user } = useSelector((state) => ({ ...state }));

  const auth = getAuth();
  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        toast.error(error.message);
      });

    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/login");
  };

  const [showBasic, setShowBasic] = useState(false);
  return (
    <>
      <MDBNavbar expand="lg" light bgColor="light" className="px-4">
        <MDBContainer fluid>
          <MDBNavbarBrand className="display-4 fst-italic  fw-bolder text-dark">
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              className="text-dark"
            >
              {" "}
              <h2>{props.title}</h2>{" "}
            </Link>
          </MDBNavbarBrand>

          {/* Mobile View */}
          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0 px-4 fw-bold">
              <MDBNavbarItem
                onClick={handleClick}
                active
                aria-current="page"
                className="nav-link"
              >
                <Link
                  style={{ textDecoration: "none" }}
                  to="/"
                  className="text-dark"
                >
                  Home{" "}
                </Link>
                &nbsp; &nbsp;
                <Link
                  style={{ textDecoration: "none" }}
                  to="/shop"
                  className="text-dark f"
                >
                  Products{" "}
                </Link>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <span className="inline p-1 w-25">
              <Search />
            </span>
            &nbsp; &nbsp;
            {!user && (
              <MDBNavbarItem className="nav-link ">
                <Link
                  style={{ textDecoration: "none" }}
                  to="/login"
                  className="text-dark"
                >
                  <div className="container">Login</div>
                </Link>
              </MDBNavbarItem>
            )}
            {!user && (
              <MDBNavbarItem className="nav-link">
                <Link
                  style={{ textDecoration: "none" }}
                  to="/Register"
                  className="text-dark"
                >
                  Register
                </Link>
              </MDBNavbarItem>
            )}
            {user && user.role === "subsciber" && (
              <Link
                to="/seller/dashboard"
                className="bg-dark text-light btn btn-raised m-3"
                style={{ textDecoration: "none" }}
              >
                Sell
              </Link>
            )}
            {user && (
              <MDBNavbarItem className="nav-link ">
                <MDBDropdown>
                  <MDBDropdownToggle className="bg-dark">
                    {/* {user.displayName} */}

                    {user.email && user.email.split("@")[0]}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link onClick={logout}>
                      <span> Logout &nbsp; </span>
                      <LogoutOutlined />
                    </MDBDropdownItem>
                    <MDBDropdownItem link>
                      {user && user.role === "subsciber" && (
                        <Link
                          to="/user/history"
                          className="text-dark"
                          style={{ textDecoration: "none" }}
                        >
                          Dashboard
                        </Link>
                      )}

                      {user && user.role === "admin" && (
                        <Link to="/admin/dashboard" className="text-dark">
                          Dashboard
                        </Link>
                      )}
                    </MDBDropdownItem>
                    <MDBDropdownItem link></MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            )}
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Header;

Header.propTypes = {
  title: PropTypes.string,
};
