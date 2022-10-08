const express = require("express");

const router = express.Router();

router.get("/user", (req, res) => {
  res.json({
    data: "hi Hammad you, user  end point is hit",
  });
});

module.exports = router;
