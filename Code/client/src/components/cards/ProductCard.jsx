import React, { useState, useEffect } from "react";
import { Card, Tooltip } from "antd";
import ProductInfromation from "./ProductInfromation";
import logo from "../../images/logo.png";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Timer from "../Timer/Timer";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { title, description, images, slug, timer, quantity } = product;

  const [tooltip, setTooltip] = useState("Click to add");

  //redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    //cart array
    let cart = [];
    if (typeof window !== "undefined") {
      //if the cart is alredy in the local storage
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      //push new items to cart

      cart.push({
        ...product,
        count: 1,
      });
      //remove duplicates
      const unique = _.uniqWith(cart, _.isEqual);
      //uniqWith from lodash compares the array of cart and remove the duplicate product

      //save to localStorage
      localStorage.setItem("cart", JSON.stringify(unique));

      setTooltip("Added");

      //add to redux
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      //show drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };
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
          <Link to={`/product/${slug}`}>
            <img
              src={images && images.length ? images[0].url : logo}
              className="p-1"
              style={{ height: "200px", objectFit: "cover", width: "285px" }}
            />
          </Link>
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,

          // <div className="text-dark fwt-bold">
          //   Current-Bid <br />
          //   {price}Rs
          // </div>,
          <Tooltip title={tooltip}>
            <div className="text-dark fwt-bold">
              <a onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-success" /> <br />
                {product.quantity < 1
                  ? "Not Available Any More"
                  : "Add to Cart"}
              </a>
            </div>
          </Tooltip>,
        ]}
      >
        <Meta title={`${title}`} description={` ${description}`} />
      </Card>
      <h4 className="text-danger">Bid Close In</h4>
      <Timer TimeMs={timer} product={product} />
    </>
  );
};

export default ProductCard;
