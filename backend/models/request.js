const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "books" },
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  status: { type: String, enum: ["pending", "accepted", "returned"], default: "pending" },
  type: { type: String, enum: ["borrow", "buy"] },
  message: String
}, { timestamps: true });

module.exports = mongoose.model("Request", requestSchema);
