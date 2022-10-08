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

    address: String,
    contactNumber: { type: Number, min: 11, max: 12, required: true },
    NICnumber: {
      type: Number,
      img: {
        data: Buffer,
      },
    },

    //   whishlist: [{ type: ObjectId, ref: "Prdocut" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
