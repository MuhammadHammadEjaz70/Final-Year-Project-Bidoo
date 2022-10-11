const express = require("express");

const router = express.Router();

//middlewares
const { authCheck } = require("../middlewares/auth.middleware");

//controllers
const { createUpdateUser,currentUser } = require("../controllers/auth.controller");
const { createUpdateSeller,currentSeller } = require("../controllers/auth.controller");

router.post("/create-update-user", authCheck, createUpdateUser);
router.post("/create-update-seller", authCheck, createUpdateSeller);
router.post("/current-user", authCheck, currentUser);
router.post("/current-seller", authCheck, currentSeller);

module.exports = router;
