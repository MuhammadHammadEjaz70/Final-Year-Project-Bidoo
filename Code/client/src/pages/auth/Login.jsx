import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { createUpdateUser } from "../../functions/auth.functions";
import { GoogleOutlined } from "@ant-design/icons";

const Login = () => {
  const [email, setEmail] = useState("xabc1551@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const provider = new GoogleAuthProvider();
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user, navigate]);

  const roleBaseRedirect = (res) => {
    if (res.data.role === "admin") {
      navigate("/admin/dashboard");
    } else if (res.data.role === "subscriber") {
      navigate("/user/history");
    }
  };

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
        createUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBaseRedirect(res);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };
  const googleLogin = async (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        console.log("Google User", user);
        const idTokenResult = await user.getIdTokenResult();
        // console.log("IdTokenResult", idTokenResult);
        // The signed-in user info.
        createUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBaseRedirect(res);
          })
          .catch((error) => {
            toast.error("login module mei error hai", error.message);
          });
      })
      .catch((error) => {
        const email = error.email;
        console.log("email", email);

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("credential", credential);
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
      <div className="container">
        <Link to="/forget/password" className="float-right  text-dark">
          Forget Password?
        </Link>
      </div>
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
              <h3>Login</h3>
            )}

            {loginForm()}
            <br />
            
            <button
              type="submit"
              onClick={handelSubmit}
              className="btn btn-raised btn-dark col-6"
              disabled={!email || password.length < 6}
            >
              Sign In
            </button>
            <br />
            <br />

            <button
              type=" submit"
              onClick={googleLogin}
              className="btn btn-raised btn-danger col-6"
            >
              <GoogleOutlined /> Sign In With Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
