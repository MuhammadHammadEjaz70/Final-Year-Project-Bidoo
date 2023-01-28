const Order = require("../models/order");

exports.orders = async (req, res) => {
  let allOrders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .populate("orderdBy")
    .exec();
  res.json(allOrders);
};
