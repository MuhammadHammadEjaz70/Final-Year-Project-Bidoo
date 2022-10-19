const express = require("express");
const router = express.Router();

//middlewares
const { authCheck } = require("../middlewares/auth.middleware");

//controllers
const { create } = require("../controllers/product.controller");

router.post("/product", authCheck, create);

module.exports = router;
