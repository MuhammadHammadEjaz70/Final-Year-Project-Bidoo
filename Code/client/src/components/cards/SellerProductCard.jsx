import React from "react";
import { Card } from "antd";
import logo from "../../images/logo.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { Meta } = Card;

const SellerProductCard = ({ product }) => {
  const { title, description, images } = product;

  return (
    <Card
      hoverable
      cover={
        <img
          src={images && images.length ? images[0].url : logo}
          className="p-1"
          style={{ height: "200px", objectFit: "cover", width: 240 }}
        />
      }
      actions={[<EditOutlined />, <DeleteOutlined className="text-danger" />]}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default SellerProductCard;
