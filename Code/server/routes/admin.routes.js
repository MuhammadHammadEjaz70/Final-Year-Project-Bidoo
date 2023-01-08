const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth.middleware");

const { orders } = require("../controllers/admin.controller");

//routes
router.get("/admin/orders", authCheck, adminCheck, orders);

module.exports = router;
