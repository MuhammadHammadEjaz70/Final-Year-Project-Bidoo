import React from 'react';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol, MDBBtn
} from 'mdb-react-ui-kit';

export default function InfoCard(props) {
  return (
    <div
        className=" h-25 d-incline-block mt-1"
      >

    <MDBCard className=" w-100 mx-auto p-1 bg-danger rounded-0">
      <MDBRow className='g-0'>
        <MDBCol md='4'>
          <MDBCardImage src='https://images.pexels.com/photos/10963373/pexels-photo-10963373.jpeg?auto=compress&cs=tinysrgb&w=800' alt='...' fluid />
        </MDBCol>
        <MDBCol md='8'>
          <MDBCardBody>
            <MDBCardTitle>{props.aboutus}</MDBCardTitle>
            <MDBCardText>
              Discription
            </MDBCardText>
            
            <MDBBtn  className='mx-1 me-5' color='light'> Shop Now </MDBBtn>
            <MDBBtn  className='mx-1 ml-5' color='dark'> Explore </MDBBtn>
            
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
      </div>
  );
}
InfoCard.defaultProps={
  aboutus:'About Us',

};