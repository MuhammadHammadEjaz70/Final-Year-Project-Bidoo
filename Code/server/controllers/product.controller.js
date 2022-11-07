const Produt = require("../models/product.model");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title + Date.now());

    console.log("body----------", req.body);

    const newProduct = await new Produt(req.body).save();
    console.log(newProduct);
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
  let products = await Produt.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subcategories")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

exports.listAllSellerProducts = async (req, res) => {
  console.log(" get product req body===>", req.headers);
  const userID = req.headers.userid;
  let products = await Produt.find({ userID })
    .populate("category")
    .populate("subcategories")
    .sort([["createdAt", "desc"]])
    .exec();

  res.json(products);
};
