import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user, navigate]);

  const handelSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        setEmail("");
        setLoading(false);
        toast.success("Check your email for pasaword reset link");
      })

      .catch((error) => {
        setLoading(false);
        toast.error("Forget Password error",error.message);
      });
  };

  const ForgetPasswordForm = () => (
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
      />

      <br />
      <button
        type="submit"
        onClick={handelSubmit}
        className="btn btn-raised btn-primary col-3"
        disabled={!email}
      >
        Submit
      </button>
    </form>
  );
  return (
    <>
      <div className="container p-5">
        <div className="row ">
          <div className="col-md-6 offset-md-3">
            {loading ? (
              <h3 className="text-danger">Loading...</h3>
            ) : (
              <h3>Forgot Password</h3>
            )}

            {ForgetPasswordForm()}

            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
