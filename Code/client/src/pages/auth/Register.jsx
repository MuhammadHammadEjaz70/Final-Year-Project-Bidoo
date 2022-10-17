import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () => {
  const [email, setEmail] = useState("");
  let navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user, navigate]);

  const handelSubmit = (e) => {
    e.preventDefault();

    const actionCodeSettings = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
        toast.success(
          `Verification email is sent to ${email}. Click the link to complete the registration`
        );
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        toast.error(error.message);
      });
  };

  const registerForm = () => (
    <form onSubmit={handelSubmit} className="row gy-5">
      <input
        type="email"
        placeholder="email@xyz.com"
        className="form-control "
        value={email}
        onChange={(e) => {
          // console.log(e.target);
          setEmail(e.target.value);
        }}
        autoFocus
      />
      <button type="submit" className="btn btn-raised btn-primary col-3">
        Submit
      </button>
     
    </form>
  );
  return (
    <>
      <div className="container p-5">
        <div className="row ">
          <div className="col-md-6 offset-md-3">
            <h3>Register</h3>

            {registerForm()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
