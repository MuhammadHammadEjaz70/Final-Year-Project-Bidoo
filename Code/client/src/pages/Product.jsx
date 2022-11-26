import React, { useState, useEffect } from "react";
import { getProduct, ProductStar } from "../functions/product.functions";
import { useParams, useNavigate } from "react-router-dom";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";

const Product = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      //Jonsa user login hai usky jo purani rating hai woh yh hai
      existingRatingObject && setStar(existingRatingObject.star);
    }
  });

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    ProductStar(name, newRating, user.token).then((res) => {
      // console.log(res.data);
      loadSingleProduct();
    });
  };
  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
          // handleBidChange={handleBidChange}
          // currentPrice={currentPrice}
        />
      </div>
      <div className="row pt-5 pb-5">
        <div className="col text-center display-6 fw-bold fst-italic bg-dark text-light">
          Related Products
        </div>
      </div>
    </div>
  );
};

export default Product;
