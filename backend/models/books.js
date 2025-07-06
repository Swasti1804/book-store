const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  type: { type: String, enum: ["sell", "lend", "exchange"] },
  price: Number,
  isAvailable: { type: Boolean, default: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  contactInfo: String,
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true }, // [lng, lat]
    city: String,
    pincode: String
  },
  imageUrl: String
}, { timestamps: true });

bookSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("books", bookSchema);
