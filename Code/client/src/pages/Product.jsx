import React, { useState, useEffect } from "react";
import { getProduct } from "../functions/product.functions";
import { useParams, useNavigate } from "react-router-dom";
import SingleProduct from "../components/cards/SingleProduct";

const Product = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
    });
  };

  const [product, setProduct] = useState({});
  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct product={product} />
      </div>
      <div className="row pt-5 pb-5">
        <div className="col text-center display-6 fw-bold fst-italic bg-dark text-light">
          Realted Products
        </div>
      </div>
    </div>
  );
};

export default Product;
