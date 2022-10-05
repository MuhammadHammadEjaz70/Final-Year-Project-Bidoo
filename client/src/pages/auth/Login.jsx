import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("xabc1551@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log("user logged in", user);
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  const loginForm = () => (
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
      <input
        type="password"
        placeholder="password"
        className="form-control "
        value={password}
        onChange={(e) => {
          // console.log(e.target);
          setPassword(e.target.value);
        }}
      />
      <br />
      <button
        type="submit"
        onClick={handelSubmit}
        className="btn btn-raised btn-primary col-3"
        disabled={!email || password.length < 6}
      >
        Login
      </button>
    </form>
  );
  return (
    <>
      <div className="container p-5">
        <div className="row ">
          <div className="col-md-6 offset-md-3">
            <h3>Login</h3>

            {loginForm()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
