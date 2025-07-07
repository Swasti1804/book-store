const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  phone: String,
  address: String,
  stats: {
    impactScore: { type: Number, default: 0 },
    booksListed: { type: Number, default: 0 },
    booksShared: { type: Number, default: 0 },
    totalDonations: { type: Number, default: 0 },
    level: { type: String, default: "Newcomer" },
  },
});

module.exports = mongoose.model("User", userSchema);
