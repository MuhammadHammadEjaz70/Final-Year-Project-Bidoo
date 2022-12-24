import React from "react";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function InfoCard(props) {
  return (
    <div className="d-incline-block mt-1">
      <MDBCard className=" w-100  mx-auto p-1 bg-dark rounded-0">
        <MDBRow className="g-0">
          <MDBCol md="3">
            <MDBCardImage
              src="https://images.pexels.com/photos/10963373/pexels-photo-10963373.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="..."
              fluid
            />
          </MDBCol>
          <MDBCol md="9">
            <MDBCardBody className="text-light">
              <MDBCardTitle className="text-light">
                {props.aboutus}
              </MDBCardTitle>
              <MDBCardText>
                Description Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Dignissimos amet, dolore architecto aspernatur mollitia
                velit vero nobis tempora, explicabo consequatur eum quis! Dolor.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Cupiditate rem non odio dolor. Officia, rem repellendus
                obcaecati quos magnam recusandae explicabo harum fugiat!
              </MDBCardText>

              <MDBBtn className="mx-1 me-5" color="light">
                {" "}
                <Link
                  className="text-dark"
                  style={{ textDecoration: "none" }}
                  to="/shop"
                >
                  Shop Now{" "}
                </Link>{" "}
              </MDBBtn>
              <MDBBtn className="mx-1 me-5" color="light">
                {" "}
                <Link
                  className="text-dark"
                  style={{ textDecoration: "none" }}
                  to="/seller/dashboard"
                >
                  Sell Now{" "}
                </Link>{" "}
              </MDBBtn>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </div>
  );
}
InfoCard.defaultProps = {
  aboutus: "About Us",
};
