import React, { useEffect, useState } from "react";
import { AdminNavigation } from "../../../components/nav/AdminNavigation";
import {
  getProductsAdmin,
  removeProduct,
} from "../../../functions/product.functions";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AdminProductCard from "../../../components/cards/AdminProductCard";
export const AllProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    // console.log("user id--->", user._id);
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsAdmin()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  //We need to pass the slug from childern component so we can send it along the request
  const handleRemove = (slug) => {
    if (window.confirm("Are you sure to delete this Product")) {
      // console.log("send delete request", slug);
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`Product is deleted`);
        })
        .catch((error) => {
          if (error.response.status === 400) toast.error(error.response.data);
          else {
            toast.error(error.message);
          }
          console.log(error);
        });
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNavigation />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>All Products</h4>
          )}
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-m-4 pb-4">
                <AdminProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
