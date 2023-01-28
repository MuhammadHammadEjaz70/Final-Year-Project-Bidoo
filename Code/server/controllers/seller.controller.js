const Order = require("../models/order");
const User = require("../models/user.model");

exports.orders = async (req, res) => {
  let productSeller;
  let productArraySeller = [];
  const user = await User.findOne({ email: req.user.email }).exec();
  JSON.stringify(user);
  console.log("user 1 ==>", user._id);

  let allOrders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .populate("orderdBy")
    .exec();
  console.log("All orders===>", allOrders);

  // const orders = allOrders;
  // console.log("orders--->", orders);

  // orders.map(({ products }) => {
  //   // console.log("products  ===>", products);
  //   let sellerProducts = products;
  //   // console.log("seller Orders==>", sellerProducts);
  //   sellerProducts.map(({ product }) => {
  //     // console.log("single product===>", product);
  //     productSeller = product.sellerID;

  //     // console.log("Seller===>", productSeller);
  //   });
  // });

  // let sellerOrders = await Order.find({
  //   products: { product: { sellerID: user } },
  // }).exec();

  // console.log("product seller===>", productSeller);
  // console.log("user===>", user.id);
  res.json(allOrders);
};

exports.orderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;
  let updated = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();
  res.json(updated);
};
