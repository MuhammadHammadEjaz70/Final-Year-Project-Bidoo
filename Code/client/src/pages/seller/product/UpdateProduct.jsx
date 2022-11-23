import React, { useState, useEffect } from "react";
import SellerNavigation from "../../../components/nav/SellerNavigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  getProduct,
  updateProduct,
} from "../../../functions/product.functions";
import {
  getAllCategories,
  getSubCategory,
} from "../../../functions/category.functions";
import UpdateProductForm from "../../../components/froms/UpdateProductForm";
import FileUpload from "../../../components/froms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [ArrayOfSubIds, setArrayOfSubIds] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategoryValue, setSelectedCategoryValue] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      //load single product
      setValues({ ...values, ...p.data });
      //load single product subcategories
      getSubCategory(p.data.category._id).then((res) => {
        //show default sub categories on first load
        setSubOptions(res.data);
        //Array of sub categories ids
        let arr = [];
        p.data.subcategories.map((s) => {
          arr.push(s._id);
        });

        setArrayOfSubIds((previous) => arr);
      });
    });
  };
  const loadCategories = () => {
    getAllCategories().then((c) => {
      setCategories(c.data);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    values.subcategories = ArrayOfSubIds;
    values.category = selectedCategoryValue
      ? selectedCategoryValue
      : values.category;
    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`Product is updated`);
        navigate("/seller/products");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.error);
      });
  };

  const handleChange = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = async (e) => {
    e.preventDefault();
    setValues({ ...values, subcategories: [] });

    setSelectedCategoryValue(e.target.value);
    getSubCategory(e.target.value).then((res) => {
      console.log("Subs options on category click", res.data);
      setSubOptions(res.data);
    });

    //if user click back to original category then show the previous sub categories selected
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    //clear old sub categories
    setArrayOfSubIds([]);
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
            {/* {JSON.stringify(values)} */}

            <hr />
            <div className="p-3">
              <FileUpload
                values={values}
                setValues={setValues}
                setLoading={setLoading}
              />
            </div>
            <hr />
            <UpdateProductForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleCategoryChange={handleCategoryChange}
              values={values}
              setValues={setValues}
              categories={categories}
              subOptions={subOptions}
              ArrayOfSubIds={ArrayOfSubIds}
              setArrayOfSubIds={setArrayOfSubIds}
              selectedCategoryValue={selectedCategoryValue}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
