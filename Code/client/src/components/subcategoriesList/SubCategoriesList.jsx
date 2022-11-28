import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getAllSubCategories } from "../../functions/subCategory.functions";
import { LoadingOutlined } from "@ant-design/icons";

const SubCategoriesList = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllSubCategories().then((res) => {
      setSubCategories(res.data);
      setLoading(false);
      //   console.log(c.data);
    });
  }, []);

  const showSubCategories = () =>
    subCategories.map((c) => (
      <div
        key={c._id}
        className="col btn btn-outlined-dark btn-lg btn-block btn-raised m-3  "
      >
        <Link className="text-dark" to={`/sub-category/${c.slug}`}>
          {c.name}
        </Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? <LoadingOutlined /> : showSubCategories()}
      </div>
    </div>
  );
};

export default SubCategoriesList;
