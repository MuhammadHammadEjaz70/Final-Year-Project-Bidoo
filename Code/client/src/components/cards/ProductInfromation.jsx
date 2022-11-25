import React from "react";
import { Suspense } from "react";
import { Link } from "react-router-dom";
const ProductInfromation = ({ product }) => {
  const {
    description,
    price,
    buyoutPrice,
    color,
    brand,
    shipping,
    category,
    subcategories,
    sold,
    quantity
  } = product;
  return (
    <ul className="list-group">
      <li className="list-group-item">
        Current Bid{" "}
        <span className="label label-default label-pill pull-s-right">
          Rs{price}
        </span>
      </li>
      <li className="list-group-item panel-footer ">
        Buyout Price{" "}
        <span  className="label label-default label-pill pull-right">
          Rs {buyoutPrice}
        </span>
      </li>
      {category && (
        <li className="list-group-item">
          Category{" "}
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </li>
      )}
      {subcategories && (
        <li className="list-group-item">
          Sub-Categories
          {subcategories.map((s) => (
            <Link
            key={s._id}
              to={`/sub-category/${s.slug}`}
              className="label label-default label-pill pull-s-right"
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}

      {/* <li className="list-group-item">
        Description{" "}
        <span className="label label-default label-pill pull-s-right">
          {description}
        </span>
      </li> */}
      <li className="list-group-item">
        Brand{" "}
        <span className="label label-default label-pill pull-s-right">
          {brand}
        </span>
      </li>
      <li className="list-group-item">
        Color{" "}
        <span className="label label-default label-pill pull-s-right">
          {color}
        </span>
      </li>
      <li className="list-group-item">
        Shipping{" "}
        <span className="label label-default label-pill pull-s-right">
          {shipping}
        </span>
      </li>
      <li className="list-group-item">
        Available{" "}
        <span className="label label-default label-pill pull-s-right">
          {quantity}
        </span>
      </li>
      <li className="list-group-item">
        Sold{" "}
        <span className="label label-default label-pill pull-s-right">
          {sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductInfromation;
