const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    NICNumber: {
      type: Number,
      maxlength: 13,
      minlength: 13,
    },
    images: {
      type: Array,
    },
    role: {
      type: String,
      default: "subsciber",
    },
    cart: {
      type: Array,
      default: [],
    },
    bidCart: {
      type: Array,
      default: [],
    },
    images: {
      type: Array,
    },

    address: String,
    phoneNumber: { type: Number, min: 11, max: 12, default: null },

    wishlist: [{ type: ObjectId, ref: "Product" }],
  },

  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
