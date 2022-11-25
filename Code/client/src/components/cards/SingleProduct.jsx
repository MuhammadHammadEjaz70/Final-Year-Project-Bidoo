import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductInformation from "./ProductInfromation";
import { Carousel } from "react-responsive-carousel";
import logo from "../../images/logo.png";

const { Meta } = Card;
const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
  const { title, images, description } = product;
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card cover={<img src={logo} className="mb-4" card-image />}></Card>
        )}
        <Tabs type="card">
          <TabPane tab="Description" key="8">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="12">
            For any quires email at Biddo@admin.com
          </TabPane>
        </Tabs>
      </div>
      <div className="col md-5">
        <h2 className="bg-dark p-3  text-light">{title}</h2>
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" /> <br /> Add to
              Cart
            </>,
            <Link to="/">
              <HeartOutlined className="text-danger" /> <br />
              Add to Wishlist
            </Link>,
          ]}
        >
          <ProductInformation product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
