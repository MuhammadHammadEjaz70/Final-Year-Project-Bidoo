import React, { useEffect, useState } from "react";
import SellerNavigation from "../../../components/nav/SellerNavigation";
import { getProductsBySeller } from "../../../functions/product.functions";
import { useSelector } from "react-redux";
import SellerProductCard from "../../../components/cards/SellerProductCard";
export const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    console.log("user id--->", user._id);
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsBySeller(user._id)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <SellerNavigation />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>All Products</h4>
          )}
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-m-4">
                <SellerProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
