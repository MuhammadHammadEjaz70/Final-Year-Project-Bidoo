import React, { useState, useEffect } from "react";
import {
  getProduct,
  ProductStar,
  productBidding,
} from "../functions/product.functions";
import { useParams } from "react-router-dom";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
import { getRealtedProducts } from "../functions/product.functions";
import ProductCard from "../components/cards/ProductCard";

const Product = () => {
  const { slug } = useParams();

  const { user } = useSelector((state) => ({ ...state }));

  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
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
      //load related products
      getRealtedProducts(res.data._id).then((res) => setRelated(res.data));
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
        />
      </div>

      <br />
      <br />

      <div className="row">
        <div className="col text-center  ">
          <hr />
          <h4 className="col text-center  text-white fw-bold display-3 m-5 bg-dark  fst-italic ">
            Related Products
          </h4>
          <hr />
        </div>
      </div>
      {/* {JSON.stringify(related)} */}

      <div className="row pb-5">
        {related.length ? (
          related.map((r) => (
            <div key={r._id} className="col-md-4" style={{ width: "310px" }}>
              <ProductCard product={r} />
            </div>
          ))
        ) : (
          <div className="text-center col">No Products Found</div>
        )}
      </div>
    </div>
  );
};

export default Product;
