import React from "react";
import { Card } from "antd";
import logo from "../../images/logo.png";
import {
  EyeOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { title, description, images, slug, price, buyoutPrice } = product;
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3"> No Ratings Yet</div>
      )}

      <Card
        hoverable
        cover={
          <img
            src={images && images.length ? images[0].url : logo}
            className="p-1"
            style={{ height: "300px", objectFit: "cover", width: 290 }}
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,

          <div className="text-dark fwt-bold">
            Current-Bid <br />
            {price}Rs
          </div>,
          <div className="text-dark fwt-bold">
            Buyout Price {buyoutPrice}Rs
          </div>,
        ]}
      >
        <Meta title={`${title}`} description={` ${description}`} />
      </Card>
    </>
  );
};

export default ProductCard;
