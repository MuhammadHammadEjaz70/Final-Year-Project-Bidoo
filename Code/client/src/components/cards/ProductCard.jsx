import React from "react";
import { Card } from "antd";
import logo from "../../images/logo.png";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Meta } = Card;

const ProductCard = ({ product }) => {
    const { title, description, images,slug ,price } = product;
  return (
 
    <Card
      hoverable
      cover={
        <img
          src={images && images.length ? images[0].url : logo}
          className="p-1"
          style={{ height: "300px", objectFit: "cover", width: 360 }}
        />
      }
      actions={[
        <Link to={`/product/${slug}`}>
          <EyeOutlined className="text-warning" /> <br /> View Product
        </Link>,
        <>
          <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart,
        </>,
      ]}
    >
      <Meta title={title} description={description} price={price}/>
    </Card>
    
   
  );
};

export default ProductCard;