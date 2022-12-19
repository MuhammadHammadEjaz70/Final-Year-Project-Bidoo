const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth.middleware");

// controllers
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  createOrder,
  orders,
  userBidCart,
  getUserBidCart,
  emptyBidCart
} = require("../controllers/user.controller");

router.post("/user/cart", authCheck, userCart); // save cart
router.get("/user/cart", authCheck, getUserCart); // get cart
router.delete("/user/cart", authCheck, emptyCart); // empty cart
router.post("/user/address", authCheck, saveAddress);

router.post("/user/bidCart", userBidCart);
router.get("/user/bidCart", authCheck, getUserBidCart);
router.delete("/user/bidCart", authCheck, emptyBidCart); 
// //payment
router.post("/user/order", authCheck, createOrder); // stripe

router.get("/user/orders", authCheck, orders);

// router.get("/user", (req, res) => {
//   res.json({
//     data: "hey you hit user API endpoint",
//   });
// });

module.exports = router;
