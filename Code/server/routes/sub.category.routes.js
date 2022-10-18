const express = require("express");
const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth.middleware");

//controllers
const {
  create,
  list,
  update,
  remove,
  read,
} = require("../controllers/sub.category.controller");

router.post("/sub-category", authCheck, adminCheck, create);
router.get("/sub-categories", list);
router.get("/sub-category/:slug", read);
router.put("/sub-category/:slug", authCheck, adminCheck, update);
router.delete("/sub-category/:slug", authCheck, adminCheck, remove);

module.exports = router;
