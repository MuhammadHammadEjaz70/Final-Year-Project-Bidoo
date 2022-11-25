const Product = require("../models/product.model");
const slugify = require("slugify");
const User = require("../models/user.model");

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title + Date.now());

    const newProduct = await new Product(req.body).save();
    // console.log(newProduct);
    res.json(newProduct);
  } catch (error) {
    console.log(error);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.listAllProducts = async (req, res) => {
  console.log(" get product req body===>", req.params);
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subcategories")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

exports.listAllSellerProducts = async (req, res) => {
  // console.log(" get product req header===>", req.headers);
  const userID = req.headers.userid;
  let products = await Product.find({ userID })
    .populate("category")
    .populate("subcategories")
    .sort([["createdAt", "desc"]])
    .exec();

  res.json(products);
};

exports.remove = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    // console.log("deleted product===>", deleted);
    res.json(deletedProduct);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Product Deletetion Failed");
  }
};
exports.read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("category")
      .populate("subcategories")
      .exec();
    res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Product Updation  Failed");
  }
};

exports.update = async (req, res) => {
  try {
    const update = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(update);
  } catch (error) {
    console.log("product update error===>", error);
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.list = async (req, res) => {
  try {
    //sort: createdAt/updatedAt
    //order: desc/ascend
    //limit: limiting the result i.e. 3
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 6;
    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subcategories")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};
// exports.list = async (req, res) => {
//   try {
//     //sort: createdAt/updatedAt
//     //order: desc/ascend
//     //limit: limiting the result i.e. 3
//     const { sort, order, limit } = req.body;
//     // console.log(" get product req body===>", req.body);
//     const products = await Product.find({})
//       .populate("category")
//       .populate("subcategories")
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();
//     console.log("res=======>", res);
//     res.json(products);
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.totalProducts = async (req, res) => {
  let totalProducts = await Product.find({}).estimatedDocumentCount().exec();
  res.json(totalProducts);
};

exports.productRating = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  //who is giving rating?
  //make sure currelty logged in user in giving rating or he have already add rating or not?

  let existingRatingObject = product.ratings.find(
    (element) => element.postedBy.toSting() === user._id.toSting()
  );

  //if user have not rated the product, push it.
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        // This is mongoDB command
        $push: { ratings: { star: star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("ratingAdded===>", ratingAdded);
    res.json(ratingAdded);
  } else {
    //if user have rated the product, update it.
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();
    console.log("ratingUpdated===>", ratingUpdated);
    res.json(ratingUpdated);
  }
};

// exports.productBidding = async (req, res) => {
//   const product = await Product.findById(req.params.productId).exec();
//   const user = await User.findOne({ email: req.user.email }).exec();
//   const { price } = req.body;
//   let newPrice = await Product.findByIdAndUpdate(
//     product._id,
//     req.body,
//     { new: true }
//   );
//   console.log("Current Bid===>", newPrice);
//   res.json(newPrice);
// };
