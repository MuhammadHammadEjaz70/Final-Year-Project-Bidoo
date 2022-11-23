const Product = require("../models/product.model");
const slugify = require("slugify");

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
