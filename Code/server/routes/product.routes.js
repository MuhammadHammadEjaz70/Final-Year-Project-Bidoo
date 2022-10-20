const express = require("express");
const router = express.Router();

//middlewares
const { authCheck } = require("../middlewares/auth.middleware");

//controllers
const { create,read } = require("../controllers/product.controller");

router.post("/product", authCheck, create);
router.get("/products", read);

module.exports = router;
