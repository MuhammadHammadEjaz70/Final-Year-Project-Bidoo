import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
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
                <Link to="/">Home</Link>
              </MDBNavbarItem>
            </MDBNavbarNav>

            <form className="d-flex input-group w-auto">
              <input
                type="search"
                className="form-control"
                placeholder="Type query"
                aria-label="Search"
              />
              <MDBBtn color="primary">Search</MDBBtn>
            </form>
            <MDBNavbarItem>
              <Link to="/login">
                {" "}
                <div>
                  {" "}
                  <MDBIcon className="px-3" far icon="user" size="2x" />
                </div>
              </Link>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <Link to="/Register">Register</Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link">
                  username
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link onClick={logout}>
                    Logout
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
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
