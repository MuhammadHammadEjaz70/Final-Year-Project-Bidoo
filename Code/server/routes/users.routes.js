const express = require("express");

const router = express.Router();

router.get("/user", (req, res) => {
  res.json({
    data: "hi Hammad, user  end point is hit",
  });
});
router.post("/get-user", (req, res) => {
  res.json({
    data: "Post end point is hit",
  });
});

module.exports = router;
