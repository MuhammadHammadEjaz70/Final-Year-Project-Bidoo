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

exports.read = async (req, res) => {
  let products = await Produt.find({});
  res.json(products);
};
