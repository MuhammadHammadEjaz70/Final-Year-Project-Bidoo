const User = require("../models/user.model");

exports.createUpdateUser = async (req, res) => {
  console.log("inside create Update function");
  const { email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name: req.body.name },
    { new: true }
  );
  if (user) {
    console.log("User updated", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: req.body.name,
    }).save();
    console.log("New User", newUser);
    res.json(newUser);
  }
};
exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((error, user) => {
    if (error) throw new Error(error);
    console.log("current user kai andr===>", user);
    res.json(user);
  });
};
