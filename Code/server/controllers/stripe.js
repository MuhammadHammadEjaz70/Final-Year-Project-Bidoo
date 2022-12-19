const User = require("../models/user.model");
const Cart = require("../models/cart");
const Product = require("../models/product.model");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  console.log("createPaymentIntent =====> ", req.body);

  // later apply coupon

  // 1 find user
  const user = await User.findOne({ email: req.user.email }).exec();

  const { cartTotal } = await Cart.findOne({
    orderdBy: user._id,
  }).exec();

  let finalAmount = 0;
  finalAmount = cartTotal * 100;

  // create payment intent with order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount,
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    payable: finalAmount,
  });
};
