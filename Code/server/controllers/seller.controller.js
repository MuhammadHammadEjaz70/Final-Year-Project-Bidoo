const Order = require("../models/order");
const User = require("../models/user.model");
var _ = require("lodash");

exports.orders = async (req, res) => {

  let productArraySeller = [];
  const user = await User.findOne({ email: req.user.email }).exec();
  // JSON.stringify(user);
  // console.log("user 1 ==>", user._id);

  let allOrders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .populate("products.product.sellerID")
    .populate("orderdBy")
    .exec();
  // console.log("All orders===>", allOrders);

  const orders = allOrders;
  // console.log ("orders--->", orders);

  orders.map(({ products, orderStatus, paymentIntent, orderdBy }) => {
    // console.log("products  ===>", products);
    let sellerProducts = products;
    // console.log("seller Orders==>", sellerProducts);
    sellerProducts.map(({ product }) => {
      // console.log("single product===>", product);
      // productSeller = product.sellerID.valueOf();
      // console.log(product.sellerID.valueOf())
      if (product.sellerID.valueOf() === user._id.toString()) {
        console.log("matched");
        const productData = {
          title: product.title,
          price: product.buyoutPrice,
          sellerID: product.sellerID,
          paymentIntent: {
            id: paymentIntent.id,
            status: paymentIntent.status,
            payment: paymentIntent.status,
            payment_method_types: paymentIntent.payment_method_types[0],
            created: paymentIntent.created,
          },
          orderStatus: orderStatus,
          address: orderdBy.address,
          name: orderdBy.name,
        };
        productArraySeller.push(productData);
        const unique = _.uniqWith(productArraySeller, _.isEqual);
      } else {
        console.log("Not Matched");
        // console.log("user===>", user.id);
      }
    });
  });

  const unique = _.uniqWith(productArraySeller, _.isEqual);
  // console.log("unique===>", unique);
  console.log("productArraySeller===>", productArraySeller);
  // res.json(allOrders);
  res.json(unique);
};
