const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  saved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Quote", quoteSchema);
