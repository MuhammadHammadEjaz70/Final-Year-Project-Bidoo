import React from "react";
import { Select } from "antd";
import { useSelector } from "react-redux";
const { Option } = Select;
const UpdateProductForm = ({
  handleSubmit,
  handleChange,
  values,
  setValues,
  handleCategoryChange,
  subOptions,
  showSub,
  categories,
  ArrayOfSubIds,
  setArrayOfSubIds,
  selectedCategoryValue,
  
}) => {
  const {
    title,
    userID,
    description,
    price,
    buyoutPrice,
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
  const { user } = useSelector((state) => ({ ...state }));
  values.userID = user._id;
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
            value={shipping === "Yes" ? "Yes" : "No"}
            className="form-control"
            onChange={handleChange}
          >
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
            value={color}
            onChange={handleChange}
          >
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
            value={brand}
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
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            className="form-control"
            value={selectedCategoryValue?selectedCategoryValue:category._id}
            onChange={handleCategoryChange}
          >
             
            {categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label>Sub Category</label>
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Please select"
            value={ArrayOfSubIds}
            onChange={(value) => setArrayOfSubIds(value)}
          >
            {subOptions.length > 0 &&
              subOptions.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
          </Select>
        </div>

        <br />
        <button className="btn btn-dark btn-outline">Save</button>
      </form>
    </div>
  );
};

export default UpdateProductForm;