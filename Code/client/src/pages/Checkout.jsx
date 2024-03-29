import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  createCashOrderForUser,
  emptyUserBidCart,
} from "../functions/user";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [completeAddress, setCompleteAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zip, setZip] = useState("");
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

  let address1 =
    "Address: " +
    address +
    " City:" +
    city +
    " Province:" +
    province +
    " Postal-Code" +
    zip;

  // const completeAddressDelivery = async () => {
  //   // setCompleteAddress(
  //   //   `Adress:${address} City:${city}  Province:${province} Postal-Code:${zip}`
  //   // );
  //   console.log("address1 ===>", address1);
  //   setCompleteAddress(address1);
  //   console.log("address ===>", completeAddress);
  // };

  const saveAddressToDb = async (e) => {
    e.preventDefault();
    // await completeAddressDelivery();
    console.log("address===>", address1);

    saveUserAddress(user.token, address1).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  const showAddress = () => (
    <>
      <form className="mx-3 ">
        <div class="col-12">
          <label for="inputAddress2" class="form-label">
            Address
          </label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="Apartment, floor, or street"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            required
          />
        </div>
        <div cxlass="col-md-6">
          <label for="inputCity" class="form-label">
            City
          </label>
          <input
            type="text"
            class="form-control"
            id="inputCity"
            value={city}
            onChange={(e) => {
              setCity(" " + e.target.value);
            }}
            required
          />
        </div>
        <div class="col-md-4">
          <label for="inputState" class="form-label">
            Province
          </label>
          <select
            id="inputState"
            class="form-select"
            onChange={(e) => {
              setProvince(" " + e.target.value);
            }}
            required
          >
            <option selected>Choose...</option>
            <option value="Punjab">Punjab</option>
            <option value="Sindh ">Sindh</option>
            <option value="KPK">KPK</option>
            <option value="Balochistan">Balochistan</option>
            <option value="Giligit">Giligit</option>
            <option value="Kashmir">Kashmir</option>
          </select>
        </div>
        <div class="col-md-2">
          <label for="inputZip" class="form-label">
            Zip Code
          </label>
          <input
            class="form-control"
            id="inputZip"
            maxLength="5"
            size="5"
            onChange={(e) => {
              setZip(" " + e.target.value);
            }}
            required
          />
        </div>

        {
          <button
            className="btn btn-dark mt-2"
            disabled={!city || !address || !province || !zip}
            onClick={saveAddressToDb}
          >
            Save
          </button>
        }
      </form>
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

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD).then((res) => {
      // console.log("user cod created response===>",res)
      if (res.data.ok) {
        //empty local storage
        if (typeof window !== undefined) localStorage.removeItem("cart");
        //empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        //empty COD redux
        dispatch({
          type: "COD",
          payload: false,
        });
        //empty cart from backend
        emptyUserCart(user.token);
        emptyUserBidCart(user.token);
        //redirect
        setTimeout(() => {
          window.location.href = "/user/history";
        }, 1000);
      }
    });
  };
  return (
    <div className="row">
      <div className="col-md-6">
        <h4 className="ml-1">Delivery Address</h4>
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
                onClick={createCashOrder}
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
