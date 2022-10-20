import React, { useState, useEffect } from "react";

import SellerNavigation from "../../../components/nav/SellerNavigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product.functions";
import {
  getAllCategories,
  getSubCategory,
} from "../../../functions/category.functions";
import ProductCreateForm from "../../../components/froms/ProductCreateForm";
const initialState = {
  title: "Apple",
  description: "Apple Laptop",
  price: "10",
  buyoutPrice: "100",
  categories: [],
  category: "",
  subcategories: [],
  shipping: "Yes",
  quantity: "12",
  images: [],
  colors: ["Red", "Black", "Brown", "Blue", "White"],
  brands: ["Apple", "Samsung", "Microsoft", "Acer", "Asus"],
  color: "Red",
  brand: "Acer",
};
const CreateProduct = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () => {
    getAllCategories().then((c) =>
      setValues({ ...values, categories: c.data })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert("Product Created");
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  const handleChange = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = async (e) => {
    e.preventDefault();
    setValues({ ...values,subcategories:[], category: e.target.value });
    console.log("Clicked Category", e.target.value);
    getSubCategory(e.target.value).then((res) => {
      console.log("Subs options on category click", res.data);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <SellerNavigation />
          </div>
          <div className="col-md-10">
            <h3>Upload New Product</h3>
            <hr />
            {/* {JSON.stringify(values.subcategories )} */}
            <ProductCreateForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              values={values}
              handleCategoryChange={handleCategoryChange}
              subOptions={subOptions}
              showSub={showSub}
              setValues={setValues}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
