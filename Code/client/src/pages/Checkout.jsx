import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,

  //   createCashOrderForUser,
} from "../functions/user";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      getUserCart(user.token).then((res) => {
        console.log("user cart res", JSON.stringify(res.data, null, 4));
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      });
    }
  }, []);

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      toast.success("Cart is empty. Contniue shopping...");
    });
  };

  const saveAddressToDb = () => {
    // console.log(address);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
        Save
      </button>
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} x {p.count} = {p.buyoutPrice * p.count}
        </p>
      </div>
    ));

  //   const createCashOrder = () => {
  //     createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
  //       console.log("USER CASH ORDER CREATED RES ", res);
  //       // empty cart form redux, local Storage, reset coupon, reset COD, redirect
  //       if (res.data.ok) {
  //         // empty local storage
  //         if (typeof window !== "undefined") localStorage.removeItem("cart");
  //         // empty redux cart
  //         dispatch({
  //           type: "ADD_TO_CART",
  //           payload: [],
  //         });
  //         // empty redux coupon
  //         dispatch({
  //           type: "COUPON_APPLIED",
  //           payload: false,
  //         });
  //         // empty redux COD
  //         dispatch({
  //           type: "COD",
  //           payload: false,
  //         });
  //         // mepty cart from backend
  //         emptyUserCart(user.token);
  //         // redirect
  //         setTimeout(() => {
  //           navigate("/user/history");
  //         }, 1000);
  //       }
  //     });
  //   };

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        {showAddress()}
        <hr />
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
        {/* <h1>{total}</h1> */}
        {/* {JSON.stringify(products)} */}
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Cart Total: {total}</p>

        <div className="row">
          <div className="col-md-6">
            {COD ? (
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                // onClick={createCashOrder}
              >
                Place Order
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                onClick={() => navigate("/payment")}
              >
                Place Order
              </button>
            )}
          </div>

          <div className="col-md-6">
            <button
              disabled={!products.length}
              onClick={emptyCart}
              className="btn btn-dark"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
