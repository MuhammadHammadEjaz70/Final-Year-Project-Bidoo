const SubCategory = require("../models/sub.category.model");
const slugify = require("slugify");
const Product = require("../models/product.model");


exports.create = async (req, res) => {
  try {
    const { name, parentCategory } = req.body;
    const category = await new SubCategory({
      name,
      parentCategory,
      slug: slugify(name),
    }).save();
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(400).send("Create SubCategory failed");
  }
};
exports.list = async (req, res) =>
  res.json(await SubCategory.find({}).sort({ createdAt: -1 }).exec());

// exports.read = async (req, res) => {
//   const subcategory = await SubCategory.findOne({
//     slug: req.params.slug,
//   }).exec();
//   console.log(" sub category:", subcategory);
//   res.json(subcategory);
// };
exports.read = async (req, res) => {
  const subCategory = await SubCategory.findOne({
    slug: req.params.slug,
  }).exec();
 
  let products = await Product.find({ subcategories:subCategory })
    .populate("category")
    .exec();

  console.log(" sub category:", subCategory);
  res.json({subCategory,products});
};


exports.remove = async (req, res) => {
  try {
    const deletesubcategory = await SubCategory.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deletesubcategory);
  } catch (error) {
    res.status(400).send("Deletion Failed");
  }
};
exports.update = async (req, res) => {
  const { name, parentCategory } = req.body;
  try {
    const updatesubcategory = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parentCategory, slug: slugify(name) },
      { new: true }
    );
    res.json(updatesubcategory);
  } catch (error) {
    res.status(400).send("Update Failed");
  }
};
