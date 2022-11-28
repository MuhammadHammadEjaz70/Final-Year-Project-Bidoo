import React from "react";
import { Suspense } from "react";
import { Link } from "react-router-dom";
const ProductInfromation = ({ product }) => {
  const {
     
    price,
    buyoutPrice,
    color,
    brand,
    shipping,
    category,
    subcategories,
    sold,
    quantity,
  } = product;
  return (
    <ul className="list-group">
      <li className="list-group-item">
        Current Bid{" "}
        <span className="label label-default label-pill  float-end">
          {" "}
          {price} Rs
        </span>
      </li>
      <li className="list-group-item panel-footer ">
        Buyout Price{" "}
        <span className=" label label-default label-pill  float-end ">
          {" "}
           {buyoutPrice} Rs
        </span>
      </li>
      {category && (
        <li className="list-group-item">
          Category{" "}
          <Link style={{textDecoration: 'none'}}
            to={`/category/${category.slug}`}
            className="label label-default label-pill  float-end"
          >
            {category.name}
          </Link>
        </li>
      )}
      {subcategories && (
        <li className="list-group-item">
          Sub-Categories
          {subcategories.map((s) => (
            <Link style={{textDecoration: 'none'}}
              key={s._id}
              to={`/sub-category/${s.slug}`}
              className="label label-default label-pill float-end"
            >
              {s.name} &nbsp;
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
        <span className="label label-default label-pill  float-end">
       
          {brand}
        </span>
      </li>
      <li className="list-group-item">
        Color{" "}
        <span className="label label-default label-pill  float-end">
          {color}
        </span>
      </li>
      <li className="list-group-item">
        Shipping{" "}
        <span className="label label-default label-pill float-end">
          {shipping}
        </span>
      </li>
      <li className="list-group-item">
        Available{" "}
        <span className="label label-default label-pill float-end">
          {quantity}
        </span>
      </li>
      <li className="list-group-item">
        Sold{" "}
        <span className="label label-default label-pill float-end">{sold}</span>
      </li>
    </ul>
  );
};

export default ProductInfromation;
