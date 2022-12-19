import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ModalImage from "react-modal-image";
import logo from "../images/logo.png";
import { toast } from "react-toastify";
import ProductCardInCheckoutBid from "../components/cards/ProductCardInCheckout";
import { userBidCart, getUserBidCart } from "../functions/user";
import _ from "lodash";

const Bids = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bidCart, setBidCart] = useState([]);
  const [tooltip, setTooltip] = useState("Click to add");

  useEffect(() => {
    console.log(user);
    console.log("component mount");
    fetchBidCart();
  }, [user]);

  const fetchBidCart = async (req, res) => {
    try {
      const result = await getUserBidCart(user.token).then((res) => {
        console.log(JSON.stringify(res.data));
        setBidCart(res.data);
      });
      // console.log(result);
      // setBidCart(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // important: here we have to request backend to get all the products in bid cart of the user.

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Add To Cart</th>
        </tr>
      </thead>

      {bidCart.map((p) => (
        // <ProductCardInCheckoutBid key={p._id} p={p} />
        <tbody>
          <tr key={p._id}>
            <td style={{ width: "130px" }}>
              <div
                style={{
                  width: "130px",
                  height: "auto",
                }}
              >
                {p.product.images.length ? (
                  <ModalImage
                    small={p.product.images[0].url}
                    large={p.product.images[0].url}
                  />
                ) : (
                  <ModalImage small={logo} large={logo} />
                )}
              </div>
            </td>
            <td>{p.product.title}</td>
            <td>${p.product.price}</td>
            <td>
              <button
                className="btn btn-dark"
                onClick={() => {
                  console.log("Clicked BID Cart ADD to cart");
                  let cart = [];
                  if (typeof window !== "undefined") {
                    //if the cart is alredy in the local storage
                    if (localStorage.getItem("cart")) {
                      cart = JSON.parse(localStorage.getItem("cart"));
                    }
                    //push new items to cart

                    cart.push({
                      ...p.product,
                      count: 1,
                    });
                    //remove duplicates
                    const unique = _.uniqWith(cart, _.isEqual);
                    //uniqWith from lodash compares the array of cart and remove the duplicate product

                    //save to localStorage
                    localStorage.setItem("cart", JSON.stringify(unique));

                    // setTooltip("Added");

                    //add to redux
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: unique,
                    });

                    toast.success("Product is Added to cart");
                  }
                  
                }}
              >
                Add to Cart
              </button>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );

  return (
    <div className="contianer-fluid p-3">
      {/* {JSON.stringify(cart )} */}

      <div className="row">
        <div className="col-md-8">
          <h4>Won Bids {bidCart.length}</h4>
          {!bidCart.length ? (
            <p>
              No Won Bids <br />
              <Link to="/shop" style={{ textDecoration: "none" }}>
                {" "}
                Continue Shopping...
              </Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        {/* <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <h5>Products</h5>
          {bidCart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} = ${c.price}
              </p>
            </div>
          ))}
          <hr />
          <h5>Total: ${getTotal()}</h5>
          <hr />
          {user ? (
            <button
              onClick={saveOrderToDb}
              disabled={!bidCart.length}
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
        </div> */}
      </div>
    </div>
  );
};

export default Bids;
