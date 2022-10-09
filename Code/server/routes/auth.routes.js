const express = require("express");

const router = express.Router();

//middlewares
const { authCheck } = require("../middlewares/auth.middleware");

//controllers
const { createUpdateUser,currentUser } = require("../controllers/auth.controller");

router.post("/create-update-user", authCheck, createUpdateUser);
router.post("/current-user", authCheck, currentUser);

module.exports = router;
