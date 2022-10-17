import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBCollapse,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function HeaderPic(props) {

  return (
    <header>
        <div
        className='p-5 text-ri bg-image'
        style={{ backgroundImage: "url('https://sneakernews.com/wp-content/uploads/2022/09/air-jordan-1-mid-se-craft-obsidian-ashen-slate-french-blue-sail-dr8868-400-8.jpg')", height: '600px' }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>{props.producttitle}</h1>
              <h4 className='mb-3'>{props.productdescription}</h4>
              <MDBBtn tag="a" outline size="lg" color='light'>
                Buy Now!
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
HeaderPic.defaultProps={
    producttitle:'Set Product Name',
    productdescription:'Set Product Description',
  };
  