import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  updatePassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { useDispatch, useSelector } from "react-redux";

import { createUpdateSeller } from "../../functions/auth.functions";

const SellerRegistrationComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const { seller } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForSignIn"));
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      }
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email, window.location.href)
        .then(async (result) => {
          // You can access the new user via result.user
          if (result.user.emailVerified) {
            // Clear email from storage.
            // window.localStorage.removeItem("emailForSignIn");
            const seller = auth.currentUser;
            const newPassword = password;
            updatePassword(seller, newPassword)
              .then(() => {
                // Update successful.
              })
              .catch((error) => {
                // An error ocurred
                toast.error(error.message);
              });
            const idTokenResult = await seller.getIdTokenResult();
            // console.log("user", user, "idTokenResult", idTokenResult);
            createUpdateSeller(idTokenResult.token)
              .then((res) => {
                dispatch({
                  type: "LOGGED_IN_SELLER",
                  payload: {
                    name: res.data.name,
                    email: res.data.email,
                    token: idTokenResult.token,
                    role: res.data.role,
                    _id: res.data._id,
                    phoneNumber: res.data.phoneNumber,
                    address:res.data.address,
                  },
                });
              })
              .catch((error) => {
                toast.error("register module mei error hai", error.message);
              });

            navigate("/seller/dashboard");
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  const completeRegistrationFrom = () => (
    <form onSubmit={handelSubmit} className="row gy-5">
      <input
        type="email"
        placeholder="email@xyz.com"
        className="form-control "
        value={email}
        disabled
      />
      <br></br>
      <input
        type="password"
        placeholder="password"
        className="form-control "
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        autoFocus
      />
      <input
        type="text"
        placeholder="address"
        className="form-control "
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
        autoFocus
      />
      <PhoneInput
        flags={flags}
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={setPhoneNumber}
      />
      <button type="submit" className="btn btn-raised btn-primary col-3">
        Register
      </button>
    </form>
  );
  return (
    <>
      <div className="container p-5">
        <div className="row ">
          <div className="col-md-6 offset-md-3">
            <h3>Seller Registraion</h3>

            {completeRegistrationFrom()}
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerRegistrationComplete;
