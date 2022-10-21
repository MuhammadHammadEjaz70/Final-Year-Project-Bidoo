const express = require("express");
const router = express.Router();

const { authCheck } = require("../middlewares/auth.middleware");

const { upload, remove } = require("../controllers/cloudinary.controller");

router.post("/uploadimages", authCheck, upload);
router.post("/remmovimage", authCheck, remove);

module.exports = router;
