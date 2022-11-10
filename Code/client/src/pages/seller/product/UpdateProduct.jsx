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
import FileUpload from "../../../components/froms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const UpdateProduct = () => {
// //   const [values, setValues] = useState(initialState);
//   const [subOptions, setSubOptions] = useState([]);
//   const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

//   useEffect(() => {
//     loadCategories();
//   }, []);
//   const loadCategories = () => {
//     getAllCategories().then((c) =>
//       setValues({ ...values, categories: c.data })
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     createProduct(values, user.token)
//       .then((res) => {
//         console.log(res);
//         window.alert("Product Created");
//         window.location.reload();
//       })
//       .catch((error) => {
//         toast.error(error.response.data.error);
//       });
//   };

//   const handleChange = async (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };

//   const handleCategoryChange = async (e) => {
//     e.preventDefault();
//     setValues({ ...values, subcategories: [], category: e.target.value });
//     console.log("Clicked Category", e.target.value);
//     getSubCategory(e.target.value).then((res) => {
//       console.log("Subs options on category click", res.data);
//       setSubOptions(res.data);
//     });
//     setShowSub(true);
//   };
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
            <hr />
            {/* <div className="p-3">
              <FileUpload
                values={values}
                setValues={setValues}
                setLoading={setLoading}
              />
            </div> */}
            <hr />

            {/* <ProductCreateForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              values={values}
              setValues={setValues}
              handleCategoryChange={handleCategoryChange}
              showSub={showSub}
              subOptions={subOptions}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
