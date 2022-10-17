import React from 'react';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,MDBCardFooter,MDBBtn
} from 'mdb-react-ui-kit';

export default function TrendingProducts(props) {
  return (
    <div
        className="h-25 mx-auto mt-3 w-75 p-3"
        // style={{width: 750}}
      >
    <h2 class="text-center">{props.cardmoduletitle}</h2>
    <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
      
      <MDBCol>

        <MDBCard className='h-100'>
          <MDBCardImage
            src='https://mdbootstrap.com/img/new/standard/city/041.webp'
            alt='...'
            position='top'
            />
          <MDBCardBody>
            <MDBCardTitle>{props.cardtitle1}</MDBCardTitle>
            <MDBCardText>
            Description
            </MDBCardText>
            <MDBBtn href='#'>Bid Now</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
            
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage
            src='https://mdbootstrap.com/img/new/standard/city/042.webp'
            alt='...'
            position='top'
            />
          <MDBCardBody>
            <MDBCardTitle>{props.cardtitle2}</MDBCardTitle>
            <MDBCardText>Description</MDBCardText>
            <MDBBtn href='#'>Bid Now</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage
            src='https://mdbootstrap.com/img/new/standard/city/043.webp'
            alt='...'
            position='top'
            />
          <MDBCardBody>
            <MDBCardTitle>{props.cardtitle3}</MDBCardTitle>
            <MDBCardText>
            Description
            </MDBCardText>
          <MDBBtn href='#'>Bid Now</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
</div>
  );
}
TrendingProducts.defaultProps={
    cardmoduletitle:'Set title here',
    cardtitle1: 'Set product name',
    cardtitle2: 'Set product name',
    cardtitle3: 'Set product name',
  };