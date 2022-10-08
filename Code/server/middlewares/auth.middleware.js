const admin = require("../firbase/index.firebase");

exports.authCheck = (req, res, next) => {
  console.log(req.headers); //token
  next();
};
