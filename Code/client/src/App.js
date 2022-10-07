import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import RegisterComplete from "./pages/auth/RegisterComplete";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import Header from "./components/nav/Header";
import ForgetPassword from "./pages/auth/ForgetPassword";

const App = () => {
  const dispatch = useDispatch();

  //To check firbase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user dispatched", user);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
      }
    });
    //cleanup
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Router>
        <Header title="Bidoo" />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route
            path="/Register/complete-register"
            element={<RegisterComplete />}
          />
          <Route path="/forget/password" element={<ForgetPassword />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
