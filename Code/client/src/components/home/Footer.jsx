import React from "react";
import { Link } from "react-router-dom";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start">
      <section className="">
        <MDBContainer className="text-center text-md-start mt-3">
          <MDBRow className="mt-1">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-2">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                Company name
              </h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="/login" className="text-reset">
                  Login
                </a>
              </p>
              <p>
                <a href="/register" className="text-reset">
                  Sign Up
                </a>
              </p>
              <p>
                <a href="/shop" className="text-reset">
                  Products
                </a>
              </p>
              <p>
                <a href="/" className="text-reset">
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Pakistan
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@bidoo.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> +9230498765432
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Get In touch</h6>
              <Link
                className="me-4"
                // style={{ textDecoration: "none" }}
                to="/"
              >
                <MDBIcon fab icon="facebook-f" />
              </Link>
              <Link
                className="me-4 "
                // style={{ textDecoration: "none" }}
                to="/"
              >
                <MDBIcon fab icon="twitter" />
              </Link>
              <Link
                className="me-4"
                // style={{ textDecoration: "none" }}
                to="/"
              >
                <MDBIcon fab icon="google" />
              </Link>
              <Link
                className="me-4 "
                // style={{ textDecoration: "none" }}
                to="/"
              >
                <MDBIcon fab icon="instagram" />
              </Link>
              <Link
                className="me-4"
                // style={{ textDecoration: "none" }}
                to="/"
              >
                <MDBIcon fab icon="linkedin" />
              </Link>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className=" text-center p-1"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2021 Copyright:
        <a className="text-reset fw-bold" href="https://bidoo.com/">
          Bidoo.com
        </a>
      </div>
    </MDBFooter>
  );
}
