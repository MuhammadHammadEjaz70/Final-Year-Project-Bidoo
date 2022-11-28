import React, { useState, useEffect } from "react";
import { getSubCategory } from "../../functions/subCategory.functions";
import ProductCard from "../../components/cards/ProductCard";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const SubCategoriesHome = () => {
  const [subCategory, setSubCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    getSubCategory(slug).then((res) => {
    //   console.log(JSON.stringify(res.data, null, 4));
      setSubCategory(res.data.subCategory);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              <LoadingOutlined />
            </h4>
          ) : (
            <h4 className="text-center bg-dark text-light p-3 mt-5 mb-5 display-4 jumbotron">
              {products.length} Products in "{subCategory.name}" category
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {products.map((p) => (
          <div className="col" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategoriesHome;
