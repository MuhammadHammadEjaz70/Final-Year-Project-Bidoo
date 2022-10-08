const express = require("express");

const router = express.Router();

//middlewares
const { authCheck } = require("../middlewares/auth.middleware");

//controllers
const { create_update_user } = require("../controllers/auth.controller");

router.post("/create-update-User",authCheck, create_update_user);

module.exports = router;
