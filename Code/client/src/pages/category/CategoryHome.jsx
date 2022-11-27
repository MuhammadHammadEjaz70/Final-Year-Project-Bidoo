import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category.functions";
import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const CategoryHome = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((c) => {
      console.log(JSON.stringify(c.data, null, 6));
      setCategory(c.data);
    });
  }, []);

  return <div>{slug}</div>;
};

export default CategoryHome;
