import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategory } from "../../functions/category.functions";
import { getAllCategories } from "../../functions/category.functions";
import { LoadingOutlined } from "@ant-design/icons";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
      //   console.log(c.data);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <div
        key={c._id}
        className="col btn btn-outlined-dark btn-lg btn-block btn-raised m-3  "
      >
        <Link  className='text-dark' to={`/category/${c.slug}`}>{c.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? <LoadingOutlined /> : showCategories()}
      </div>
    </div>
  );
};

export default CategoryList;
