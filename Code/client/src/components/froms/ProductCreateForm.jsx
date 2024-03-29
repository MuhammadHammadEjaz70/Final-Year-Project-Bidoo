import React from "react";
import { Select } from "antd";
import { useSelector } from "react-redux";
const { Option } = Select;
const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  values,
  handleCategoryChange,
  subOptions,
  showSub,
  setValues,
}) => {
  const {
    title,
    sellerID,
    description,
    price,
    buyoutPrice,
    categories,
    category,
    subcategories,
    shipping,
    quantity,
    timer,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;
  const { user } = useSelector((state) => ({ ...state }));

  values.sellerID = user._id;
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
{/* 
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
        </div> */}
        <div className="form-group">
          <label>Color</label>
          <select name="color" className="form-control" onChange={handleChange}>
            <option>Select One</option>

            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Bid Time</label>
          <select
            name="timer"
            type="number"
            className="form-control"
            onChange={handleChange}
            required
          >
            <option>Select One</option>
            <option value={Date.now() + 60 * 1000}>2 Mints</option>
            <option value={Date.now() + 1 * 24 * 60 * 60 * 1000}>
              1-Day (24 Hours)
            </option>
            <option value={Date.now() + 2 * 24 * 60 * 60 * 1000}>
              2-Days (48 Hours){" "}
            </option>
            <option value={Date.now() + 3 * 24 * 60 * 60 * 1000}>
              3-Days (72 Hours)
            </option>
            <option value={Date.now() + 4 * 24 * 60 * 60 * 1000}>
              4-Days (96 Hours)
            </option>
            <option value={Date.now() + 5 * 24 * 60 * 60 * 1000}>
              5-Days (120 Hours)
            </option>
            <option value={Date.now() + 6 * 24 * 60 * 60 * 1000}>
              6-Days (144 Hours)
            </option>
            <option value={Date.now() + 7 * 24 * 60 * 60 * 1000}>
              7-Days (168 Hours)
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>Brand</label>
          <select name="brand" className="form-control" onChange={handleChange}>
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
            onChange={handleCategoryChange}
          >
            <option>Click to Select Category</option>
            {categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
        {showSub && (
          <div className="form-group">
            <label>Sub Category</label>
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              value={subcategories}
              onChange={(value) =>
                setValues({ ...values, subcategories: value })
              }
            >
              <option>Click to Select Category</option>
              {subOptions.length > 0 &&
                subOptions.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
            </Select>
          </div>
        )}

        <br />
        <button className="btn btn-dark btn-outline">Save</button>
      </form>
    </div>
  );
};

export default ProductCreateForm;
