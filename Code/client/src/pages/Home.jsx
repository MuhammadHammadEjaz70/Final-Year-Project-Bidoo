import React, { useState, useEffect } from "react";
import { getProductsByCount } from "../functions/product.functions";
import ProductCard from "../components/cards/ProductCard";
import { LoadingOutlined } from "@ant-design/icons";
import TypeWritter from "../components/cards/TypeWritter";
import LoadingCard from "../components/cards/LoadingCard";
import { Skeleton } from "antd";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadAllProducts();
  }, []);
  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(6).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };
  return (
    <>
      <div className="bg-light p-5 rounded-lg m-3 text-dark h1 font-weight-bold text-center">
        <TypeWritter
          text={[
            "BIDOO Bid it Now",
            "New Arrivals",
            "Latest Products",
            "Best Seller",
          ]}
        />
      </div>

      <div className="container">
        {loading ? (
          <LoadingCard count={6} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
