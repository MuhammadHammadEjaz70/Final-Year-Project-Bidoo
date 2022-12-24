import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  updatePassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { createUpdateUser } from "../../functions/auth.functions";

const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [name, setName] = useState("");
  let navigate = useNavigate();
  let dispatch = useDispatch();

  // const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForSignIn"));
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      toast.error("Complete the form");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password === passwordRepeat) {
      toast.error("Password does not match");
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
            const user = auth.currentUser;
            const newPassword = password;
            updatePassword(user, newPassword)
              .then(() => {
                // Update successful.
              })
              .catch((error) => {
                // An error ocurred
                toast.error(error.message);
              });
            const idTokenResult = await user.getIdTokenResult();
            // console.log("user", user, "idTokenResult", idTokenResult);
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
              })
              .catch((error) => {
                toast.error("register module mei error hai", error.message);
              });

            navigate("/");
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  const handelChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  // const completeRegistrationFrom = () => (
  //   <form className="row gy-5">
  //     <input
  //       type="email"
  //       placeholder="email@xyz.com"
  //       className="form-control "
  //       value={email}
  //       disabled
  //     />
  //     <br></br>
  //     <input
  //       type="name"
  //       placeholder="name"
  //       className="form-control "
  //       value={name}
  //       onChange={handelChange}
  //     />
  //     <br></br>
  //     <input
  //       type="password"
  //       placeholder="password"
  //       classNameName="form-control "
  //       value={password}
  //       onChange={(e) => {
  //         setPassword(e.target.value);
  //       }}
  //       autoFocus
  //     />

  //     <button type="submit" classNameName="btn btn-raised btn-dark col-3">
  //       Register
  //     </button>
  //   </form>
  // );
  return (
    <>
      <form onSubmit={handelSubmit}>
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div
                  className="card text-black"
                  style={{ borderRadius: "25px" }}
                >
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Sign up
                        </p>

                        <form className="mx-1 mx-md-4">
                          <label>Your Name</label>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="name"
                                placeholder="name"
                                className="form-control "
                                value={name}
                                onChange={handelChange}
                                style={{ border: "2px solid gray" }}
                              />
                              {/* <label className="form-label">Your Name</label> */}
                            </div>
                          </div>
                          <label>Your Email</label>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="email"
                                placeholder="email@xyz.com"
                                className="form-control "
                                value={email}
                                disabled
                                style={{ border: "2px solid gray" }}
                              />
                              {/* <label className="form-label">Your Email</label> */}
                            </div>
                          </div>
                          <label>Password</label>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="password"
                                className="form-control"
                                style={{ border: "2px solid gray" }}
                                classNameName="form-control "
                                value={password}
                                onChange={(e) => {
                                  setPassword(e.target.value);
                                }}
                              />
                              {/* <label className="form-label">Password</label> */}
                            </div>
                          </div>
                          <label>Confrim Password</label>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="password"
                                className="form-control"
                                style={{ border: "2px solid gray" }}
                                classNameName="form-control "
                                value={passwordRepeat}
                                onChange={(e) => {
                                  setPasswordRepeat(e.target.value);
                                }}
                              />
                              {/* <label className="form-label">
                                Repeat your password
                              </label> */}
                            </div>
                          </div>
                          <div className="form-check d-flex justify-content-center mb-5">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              value=""
                              id="form2Example3c"
                            />
                            <label className="form-check-label">
                              I agree all statements in{" "}
                              <a href="/">Terms of service</a>
                            </label>
                          </div>
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="submit"
                              className="btn btn-primary btn-lg"
                            >
                              Register
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                          className="img-fluid"
                          alt="Sample image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
};

export default RegisterComplete;
