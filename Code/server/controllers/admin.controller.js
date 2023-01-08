const Order = require("../models/order");

exports.orders = async (req, res) => {
  let allOrders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .exec();
  res.json(allOrders);
};
