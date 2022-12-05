import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart = () => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.buyoutPrice;
    }, 0);
  };

  const saveOrderToDb = () => {
     
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) navigate("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Current Bid Price</th>
          <th scope="col"> Buyout Price</th>
          <th scope="col">Count</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className="contianer-fluid p-3">
      {/* {JSON.stringify(cart )} */}

      <div className="row">
        <div className="col-md-8">
          <h4>Total items in Cart {cart.length}</h4>
          {!cart.length ? (
            <p>
              No Products in the cart <br />
              <Link to="/shop" style={{textDecoration: "none" }}> Continue Shopping...</Link>
            </p>
          ) : (
            showCartItems()
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
            <button
              onClick={saveOrderToDb}
              disabled={!cart.length}
              className="btn btn-sm btn-dark mt-2"
            >
              Proceed to CheckOut
            </button>
          ) : (
            <Link to="/login">
              <button className="btn btn-sm btn-dark mt-2">
                <Link to="/login" state={{ from: `/cart` }}>
                  Login to CheckOut
                </Link>
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
