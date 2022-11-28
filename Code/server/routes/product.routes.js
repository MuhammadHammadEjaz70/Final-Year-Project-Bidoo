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
  list,
  totalProducts,
  productRating,
  productBidding,
  listRelated,
  searchFilter,
} = require("../controllers/product.controller");

router.post("/product", authCheck, create);
router.get("/products/total", totalProducts);

router.get("/products/:count", listAllProducts);
router.get("/products-seller", listAllSellerProducts);
router.delete("/product/:slug", authCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, update);

router.post("/products", list);
//related
router.get("/product/related/:productId", listRelated);

//rating
router.put("/product/star/:productId", authCheck, productRating);

//bidding
router.put("/product/bid/:slug", authCheck, productBidding);

//search
router.post("/search/filter", searchFilter);

module.exports = router;
