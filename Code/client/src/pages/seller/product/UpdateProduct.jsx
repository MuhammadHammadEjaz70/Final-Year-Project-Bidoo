import React, { useState, useEffect } from "react";
import SellerNavigation from "../../../components/nav/SellerNavigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct } from "../../../functions/product.functions";
import {
  getAllCategories,
  getSubCategory,
} from "../../../functions/category.functions";
import UpdateProductForm from "../../../components/froms/UpdateProductForm";
import FileUpload from "../../../components/froms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const initialState = {
  title: " ",
  userID: "",
  description: " ",
  price: "",
  buyoutPrice: "",

  category: "",
  subcategories: [],
  shipping: " ",
  quantity: " ",
  images: [],
  colors: ["Red", "Black", "Brown", "Blue", "White", "Other"],
  brands: ["Apple", "Samsung", "Microsoft", "Acer", "Asus", "Other"],
  color: " ",
  brand: " ",
};

const UpdateProduct = () => {
  const { slug } = useParams();
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [category, setCategory] = useState("");
  // const [subCategory, setSubCategory] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      setValues({ ...values, ...p.data });
    });
  };
  const loadCategories = () => {
    getAllCategories().then((c) => {
      setCategories(c.data);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // createProduct(values, user.token)
    //   .then((res) => {
    //     console.log(res);
    //     window.alert("Product Created");
    //     window.location.reload();
    //   })
    //   .catch((error) => {
    //     toast.error(error.response.data.error);
    //   });
  };

  const handleChange = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = async (e) => {
    e.preventDefault();
    setValues({ ...values, subcategories: [], category: e.target.value });
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
            {loading ? (
              <LoadingOutlined className="text-dark h1" />
            ) : (
              <h4>Edit Product</h4>
            )}
            {JSON.stringify(values)}

            <hr />
            {/* <div className="p-3">
              <FileUpload
                values={values}
                setValues={setValues}
                setLoading={setLoading}
              />
            </div> */}
            <hr />
            <UpdateProductForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleCategoryChange={handleCategoryChange}
              values={values}
              setValues={setValues}
              categories={categories}
              showSub={showSub}
              subOptions={subOptions}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
