import React, { useState, useEffect } from "react";
import SellerNavigation from "../../../components/nav/SellerNavigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product.functions";

const initialState = {
  title: "",
  description: "",
  price: "",
  buyoutPrice: "",
  categories: [],
  category: "",
  subcategories: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Red", "Black", "Brown", "Blue", "White"],
  brands: ["Apple", "Samsung", "Microsoft", "Acer", "Asus"],
  color: "",
  brand: "",
};
const CreateProduct = () => {
  const [values, setValues] = useState(initialState);
  const { user } = useSelector((state) => ({ ...state }));

  const {
    title,
    description,
    price,
    buyoutPrice,
    categories,
    category,
    subcategories,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  const handelSubmit = async (e) => {
    e.preventDefault();
    createProduct(values, user.token, user.token)
      .then((res) => {
        console.log(res);
        toast.success("Product Created");
      })
      .catch((error) => {
        if (error.response.status === 400) toast.error(error.response.data);
        else {
          toast.error(error.message);
        }
      });
  };

  const handleChange = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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
            <form onSubmit={handelSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={title}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  value={description}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Base Price</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={price}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Buyout Price</label>
                <input
                  type="number"
                  name="buyoutPrice"
                  className="form-control"
                  value={buyoutPrice}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Shipping</label>
                <select
                  name="shipping"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Select One</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div className="form-group">
                <label>Quantitiy</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  value={quantity}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Color</label>
                <select
                  name="color"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Select One</option>

                  {colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Brand</label>
                <select
                  name="brand"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Select One</option>

                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <button className="btn btn-outline-info">Save</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;