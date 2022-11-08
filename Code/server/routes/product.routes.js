const express = require("express");
const router = express.Router();

//middlewares
const { authCheck } = require("../middlewares/auth.middleware");

//controllers
const {
  create,
  listAllProducts,
  listAllSellerProducts,
  remove,
} = require("../controllers/product.controller");

router.post("/product", authCheck, create);
router.get("/products/:count", listAllProducts);
router.get("/products-seller", listAllSellerProducts);
router.delete("/product/:slug", authCheck, remove);

module.exports = router;
