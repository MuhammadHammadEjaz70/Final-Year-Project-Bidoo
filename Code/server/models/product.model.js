const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    sellerID: { type: ObjectId, ref: "User" },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    buyoutPrice: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subcategories: [
      {
        type: ObjectId,
        ref: "SubCategory",
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },

    productStatus: { type: String, default: "enable" },

    productBidStatus: {
      type: String,
      default: "incomplete",
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    bidPostedBy: {
      type: ObjectId,
      ref: "User",
    },
    color: {
      type: String,
      enum: ["Red", "Black", "Brown", "Blue", "White", "N/A"],
    },
    timer: Number,
    brand: {
      type: String,
      trim: true,
      enum: [
        "Apple",
        "Samsung",
        "Microsoft",
        "Acer",
        "Asus",
        "Nike",
        "Nike",
        "Vans",
        "Adidas",
        "N/A",
      ],
    },
    ratings: [{ star: Number, postedBy: { type: ObjectId, ref: "User" } }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
