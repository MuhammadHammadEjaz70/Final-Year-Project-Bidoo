import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.buyoutPrice;
    }, 0);
  };
  return (
    <div className="contianer-fluid p-3">
      {/* {JSON.stringify(cart )} */}

      <div className="row">
        <div className="col-md-8">
          <h4>Cart({cart.length})</h4>
          {!cart.length ? (
            <p>
              No Products in the cart <br />
              <Link to="/shop">Continue Shopping...</Link>
            </p>
          ) : (
            "show cart items"
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <h5>Products</h5>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = {c.buyoutPrice * c.count}Rs
              </p>
            </div>
          ))}
          <hr />
          <h5>Total: {getTotal()}Rs</h5>
          <hr />
          {user ? (
            <button className="btn btn-sm btn-dark mt-2">
              Proceed to CheckOut
            </button>
          ) : (
            <Link to="/login">
              <button className="btn btn-sm btn-dark mt-2">
                Login to Checkout
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
