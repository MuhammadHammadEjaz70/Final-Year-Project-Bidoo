const express = require("express");

const router = express.Router();
const {user}= require('../controllers/auth.controller')

router.get("/createUser",user);

module.exports=router;