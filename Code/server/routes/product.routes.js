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
  read,
  update,
  list
} = require("../controllers/product.controller");

router.post("/product", authCheck, create);
router.get("/products/:count", listAllProducts);
router.get("/products-seller", listAllSellerProducts);
router.delete("/product/:slug", authCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug",authCheck,update)

router.post("/products",list)

module.exports = router;
