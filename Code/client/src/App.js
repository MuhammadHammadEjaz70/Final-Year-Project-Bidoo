import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";

import Home from "./pages/Home";
import SideDrawer from "./components/drawer/SideDrawer";
import Header from "./components/nav/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgetPassword from "./pages/auth/ForgetPassword";
import History from "./pages/user/History";
import UserPrivateRoute from "./components/privateRoutes/UserPrivateRoute";
import Password from "./pages/user/Password";
import { currentUser } from "./functions/auth.functions";
import WishList from "./pages/user/Wishlist";
import Product from "./pages/Product.jsx";

import { AdminDashboard } from "./pages/admin/AdminDashboard";
import AdminPrivateRoute from "./components/privateRoutes/AdminPrivateRoute";
import { AdminCreateCategory } from "./pages/admin/category/AdminCreateCategory";
import { AdminUpdateCategory } from "./pages/admin/category/AdminUpdateCategory";
import { SubCreateCategory } from "./pages/admin/subCategory/SubCreateCategory";
import { SubUpdateCategory } from "./pages/admin/subCategory/SubUpdateCategory";
import CategoryHome from "./pages/category/CategoryHome";
import SubCategoriesHome from "./pages/subcategories/SubCategoriesHome";
import { AllProductsAdmin } from "./pages/admin/product/AllProductsAdmin";

import { SellerDashboard } from "./pages/seller/SellerDashboard";
import { AllProducts } from "./pages/seller/product/AllProducts";

import CreateProduct from "./pages/seller/product/CreateProduct";
import UpdateProduct from "./pages/seller/product/UpdateProduct";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Bids from "./pages/Bids";
import Checkout from "./pages/Checkout";
import CheckoutBid from "./pages/CheckoutBid";
import Payment from './pages/Payment'

const App = () => {
  const dispatch = useDispatch();

  //To check firbase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user dispatched", user);

        currentUser(idTokenResult.token)
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
            toast.error(error.message);
          });
      }
    });
    //cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Router>
        <Header title="Bidoo" />
        <SideDrawer />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/Login" element={<Login />} exact />
          <Route path="/Register" element={<Register />} exact />
          <Route
            path="/Register/complete-register"
            element={<RegisterComplete />}
          />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/category/:slug" element={<CategoryHome />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/bids" element={<Bids />} />
          

          <Route path="/sub-category/:slug" element={<SubCategoriesHome />} />

          <Route element={<UserPrivateRoute />}>
            <Route path="/user/history" element={<History />} exact />
            <Route path="/user/password" element={<Password />} exact />
            <Route path="/user/wishlist" element={<WishList />} exact />
            <Route path="/checkout" element={<Checkout />} exact />
            <Route path="/checkoutBid" element={<CheckoutBid />} exact />
            <Route path="/payment" element={<Payment />} />
            <Route
              path="/seller/dashboard"
              element={<SellerDashboard />}
              exact
            />
            <Route path="/seller/product" element={<CreateProduct />} exact />
            <Route
              path="/seller/product/:slug"
              element={<UpdateProduct />}
              exact
            />
            <Route path="/seller/products" element={<AllProducts />} exact />
          </Route>

          <Route path="/forget/password" element={<ForgetPassword />} />

          <Route element={<AdminPrivateRoute />}>
            <Route path="/admin/products" element={<AllProductsAdmin />} exact />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/category" element={<AdminCreateCategory />} />
            <Route
              path="/admin/category/:slug"
              element={<AdminUpdateCategory />}
            />
            <Route path="/admin/sub" element={<SubCreateCategory />} />
            <Route
              path="/admin/sub-category/:slug"
              element={<SubUpdateCategory />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
