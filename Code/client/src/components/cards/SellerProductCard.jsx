import React from "react";
import "../../App.css";
import { Card } from "antd";
import logo from "../../images/logo.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Meta } = Card;

const SellerProductCard = ({ product, handleRemove }) => {
  const {
    title,
    description,
    images,
    slug,
    productStatus,
    productBidStatus,
    bidPostedBy,
    price,
  } = product;

  //    if (bidPostedBy === undefined) {
  //   bidPostedBy = "No Bid is placed";
  // }
  return (
    <>
      <Card
        hoverable
        cover={
          <>
            <div>
              <img
                src={images && images.length ? images[0].url : logo}
                className="p-1"
                style={{ height: "200px", objectFit: "cover", width: "280px" }}
              />
            </div>
            <div className="h5 pt-3 "> Product Status : {productStatus}d </div>
            <div className="h5 pt-3 "> Bid Status : {productBidStatus} </div>
            <div className="h5 pt-3 ">
              {" "}
              {`Higest Bidd : "${price}Rs"  By "${bidPostedBy}"`}
            </div>
          </>
        }
        actions={[
          <Link to={`/seller/product/${slug}`}>
            <EditOutlined className="text-warning" />
          </Link>,
          <DeleteOutlined
            className="text-danger"
            onClick={() => handleRemove(slug)}
          />,
        ]}
      >
        <Meta title={title} description={description} />
      </Card>
    </>
  );
};

export default SellerProductCard;
