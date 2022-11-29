import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  sortProducts,
  getTotalProducts,
} from "../../functions/product.functions";
import ProductCard from "../../components/cards/ProductCard";
import LoadingCard from "../../components/cards/LoadingCard";
import { Pagination } from "antd";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    // loadAllProducts();
    sortAllProducts();
  }, [currentPage]);

  useEffect(() => {
    getTotalProducts().then((res) => {
      setProductsCount(res.data);
    });
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(6).then((res) => {
      setProducts(res.data);
      console.log(res);
      setLoading(false);
    });
  };
  const sortAllProducts = () => {
    setLoading(true);
    sortProducts("createdAt", "desc", currentPage).then((res) => {
      //   console.log("Response came back from backend");
      setProducts(res.data);
      setLoading(false);
    });
  };
  const onChange = (currentPage) => {
    console.log(currentPage);
    setCurrentPage(currentPage);
  };
  const total = Math.round((productsCount / 6) * 10);
  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
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
      <br />

      <div className="row ">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination current={currentPage} total={total} onChange={onChange} />
        </nav>
      </div>
      <br />
    </>
  );
};

export default NewArrivals;
