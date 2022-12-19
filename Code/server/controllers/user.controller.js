const User = require("../models/user.model");
const Product = require("../models/product.model");
const Cart = require("../models/cart");
const Order = require("../models/order");

exports.userCart = async (req, res) => {
  const { cart } = req.body;
  let products = [];
  const user = await User.findOne({ email: req.user.email }).exec();

  // check if cart with logged in user id already exist
  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;

    // get price for creating total
    let productFromDb = await Product.findById(cart[i]._id)
      .select("price")
      .select("buyoutPrice")
      .exec();
    if (productFromDb.productBidStatus !== "complete") {
      object.buyoutPrice = productFromDb.buyoutPrice;
    } else {
      object.price = productFromDb.price;
    }

    products.push(object);
  }

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].buyoutPrice;
  }

  let newCart = await new Cart({
    products,
    cartTotal,
    orderdBy: user._id,
  }).save();

  console.log("new cart ----> ", newCart);
  res.json({ ok: true });
};

exports.userBidCart = async (req, res) => {
  // console.log("This is the request body comming from front end---->", req.body); //{bidCart: [], bidPostedBy: user}

  const { product, bidPostedBy } = req.body;
  // console.log("product===>", product);

  // console.log("Product===>", update);
  //user with highest bid
  const user = await User.findOne({ _id: bidPostedBy }).exec();
  // console.log("bidder with highest bid --->", user);

  if (user !== null) {
    // console.log(user.bidCart);
    // user.bidCart.push({ product });
    const product = await Product.findOneAndUpdate(
      { _id: req.body.product._id },
      { buyoutPrice: req.body.product.price },
      { new: true }
    ).exec();

    const newCart = await User.updateOne(
      { _id: bidPostedBy },
      { $push: { bidCart: { product } } },
      { new: true }
    ).exec();
    // console.log("after===>", user.bidCart);
    // console.log("after===>", newCart);
  }
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderdBy: user._id })
    .populate("products.product", "_id title price buyOutPrice")
    .exec();

  const { products, cartTotal } = cart; //req.data.products
  res.json({ products, cartTotal });
};

exports.getUserBidCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const bidCart = user.bidCart;

  res.json(bidCart);
};

exports.emptyCart = async (req, res) => {
  console.log("empty cart");
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOneAndRemove({ orderdBy: user._id }).exec();
  res.json(cart);
};
exports.emptyBidCart = async (req, res) => {
  console.log("empty  bid cart");
  const user = await User.findOne({ email: req.user.email }).exec();

  const emptyCart = await User.updateOne(
    { email: req.user.email },
    { $set: { bidCart: [] } },
    { new: true }
  ).exec();
};

exports.saveAddress = async (req, res) => {
  const address = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.completeAddress }
  ).exec();
  // console.log(completeAddress);
  res.json({ ok: true });
};

exports.createOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse;

  const user = await User.findOne({ email: req.user.email }).exec();
  // const seller = await User.findOne({ email: req.user.email }).exec();

  let { products } = await Cart.findOne({ orderdBy: user._id })
    .populate("products.sellerID")
    .exec();

  // const sellerDetails = products.map((s) => {
  //   const seller = s.product.sellerID;
  // });

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderdBy: user._id,
    // soldBy: products.sellerID,
  }).save();

  //decrement quantity  and increment sold
  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updated = await Product.bulkWrite(bulkOption, {});
  console.log("product quantity decremented---->", updated);
  console.log("new order---->", newOrder);
  res.json({ ok: true });
};

exports.orders = async (req, res) => {
  let user = await User.findOne({ email: req.user.email }).exec();

  let userOrders = await Order.find({ orderdBy: user._id })
    .populate("products.product")
    .exec();
  res.json(userOrders);
};
