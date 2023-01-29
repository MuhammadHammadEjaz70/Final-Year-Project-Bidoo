const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth.middleware");

const { orders } = require("../controllers/seller.controller");

//routes
router.get("/seller/orders", authCheck, orders);
// router.put("/seller/order-status", authCheck, orderStatus);

module.exports = router;
