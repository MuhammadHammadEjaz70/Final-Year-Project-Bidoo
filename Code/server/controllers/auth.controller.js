const User = require("../models/user.model");

exports.createUpdateUser = async (req, res) => {
  console.log("inside create Update function");
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  );
  if (user) {
    console.log("User updated", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    console.log("New User", newUser);
    res.json(newUser);
  }
};

exports.currentUser=async(req,res)=>{
  User.findOne({email:req.user.email}).exec((error,user)=>{
    if(error) throw new Error(error);
    res.json(user)
  })
   
}