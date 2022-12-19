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
    contactNumber: { type: Number, min: 11, max: 12 },

    //   whishlist: [{ type: ObjectId, ref: "Prdocut" }],
  },

  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
