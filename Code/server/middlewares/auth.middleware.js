const admin = require("../firbase/index.firebase");

exports.authCheck = async (req, res, next) => {
  // console.log(req.headers); //token
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    console.log("firebase user in authcheck", firebaseUser);
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
