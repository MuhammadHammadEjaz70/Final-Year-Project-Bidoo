const admin = require("../firbase/index.firebase");
const User = require("../models/user.model");

exports.authCheck = async (req, res, next) => {
  // console.log(req.headers); //token
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    req.user = firebaseUser;
    next();
  } catch (error) {
    //401 means unauthorized
    console.log(error);
    res.status(401).json({
      error: "Invlaid or Expired Token",
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;
  const admin = await User.findOne({ email }).exec();

  if (admin.role !== "admin") {
    res.status(403).json({ error: "Admin resource. Access denied  " });
  } else {
    next();
  }
};
