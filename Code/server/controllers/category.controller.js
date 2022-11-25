const Category = require("../models/category.model");
const SubCategory = require("../models/sub.category.model");
const slugify = require("slugify");


exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(400).send("Create category failed");
  }
};
exports.list = async (req, res) =>
  res.json(await Category.find({}).sort({ createdAt: -1 })
  .exec());

exports.read = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).exec();
  console.log("category:", category);
  res.json(category);
};
exports.remove = async (req, res) => {
  try {
    const deleteCategory = await Category.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleteCategory);
  } catch (error) {
    res.status(400).send("Deletion Failed");
  }
};
exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updateCategory = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updateCategory);
  } catch (error) {
    res.status(400).send("Update Failed");
  }
};

exports.getSubs = (req, res) =>
  SubCategory.find({ parentCategory: req.params._id }).exec((error, subs) => {
    if (error) {
      console.log(error);
    }
    res.json(subs);
  });
