import React, { useState } from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductInformation from "./ProductInfromation";
import { showAverage } from "../../functions/rating";
import { Carousel } from "react-responsive-carousel";
import logo from "../../images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import StarRatings from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import BiddingModal from "../modal/BiddingModal";
import _ from "lodash";
import Timer from "../Timer/Timer";

// This is children component of product component

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id, price, timer, quantity } = product;
  const [tooltip, setTooltip] = useState("Click to add");
  //redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  //convert days into to miliseconds
  // const totalTime = Date.now() + timer * 24 * 60 * 60 * 1000;
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
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card cover={<img src={logo} className="mb-4" card-image />}></Card>
        )}
        <Tabs type="card">
          <items tab="Description" key="8">
            {description && description}
          </items>
          <items tab="More" key="12">
            For any quires email at Biddo@admin.com
          </items>
        </Tabs>
      </div>
      <div className="col md-5">
        <h2 className="bg-dark p-3  text-light">{title}</h2>
        <h4 className="text-danger">Bid Close In</h4>
        <Timer TimeMs={timer} product={product} />
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3"> No Ratings Yet</div>
        )}

        <Card
          actions={[
            <a onClick={handleAddToCart}>
              <ShoppingCartOutlined
                className="text-success"
                disabled={product.quantity === 0}
              />{" "}
              <br /> Add to Cart
            </a>,
            <BiddingModal
              product={product}
              disabled={product.quantity === 0}
            />,

            <RatingModal>
              <StarRatings
                name={_id}
                numberofStarts={5}
                rating={star}
                isSelectable={true}
                starRatedColor="black"
                changeRating={onStarClick}
              />
            </RatingModal>,
          ]}
        >
          <ProductInformation product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
