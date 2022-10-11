const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const sellerSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
        type:String,
        default:"seller",
    },

    address: String,
    contactNumber: { type: Number, min: 11, max: 12 },
    NICnumber: {
      type: Number,
      img: {
        data: Buffer,
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Seller", sellerSchema);
