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
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";

const Header = (props) => {
  const handleClick = () => {
    console.log("clicked");
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
          <MDBNavbarBrand className="Display-3">{props.title}</MDBNavbarBrand>

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
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0 px-4 ">
              <MDBNavbarItem
                onClick={handleClick}
                active
                aria-current="page"
                className="nav-link"
              >
                <Link to="/">Home </Link>
              </MDBNavbarItem>
            </MDBNavbarNav>

            {!user && (
              <MDBNavbarItem>
                <Link to="/login">
                  {" "}
                  <div className="container">Login</div>
                </Link>
              </MDBNavbarItem>
            )}
            {!user && (
              <MDBNavbarItem>
                <MDBBtn>
                  {" "}
                  <Link to="/Register">Register</Link>
                </MDBBtn>
              </MDBNavbarItem>
            )}
            {user && (
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle className="nav-link">
                    {/* {user.displayName} */}
                    {user.email && user.email.split("@")[0]}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link onClick={logout}>
                      Logout
                    </MDBDropdownItem>
                    <MDBDropdownItem link>
                      {user && user.role === "subsciber" && (
                        <Link to="/user/history">Dashboard</Link>
                      )}
                      {user && user.role === "admin" && (
                        <Link to="/admin/dashboard">Dashboard</Link>
                      )}
                    </MDBDropdownItem>
                    <MDBDropdownItem link>
                      <Link to="/seller/dashboard">Sell/Bid</Link>
                    </MDBDropdownItem>
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
