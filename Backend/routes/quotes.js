const express = require("express");
const router = express.Router();
const Quote = require("../models/Quote");
const auth = require("../middleware/auth"); // JWT middleware

// Get user's own quotes
router.get("/my", auth, async (req, res) => {
  const quotes = await Quote.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(quotes);
});

// Get saved quotes
router.get("/saved", auth, async (req, res) => {
  const quotes = await Quote.find({ savedBy: req.user.id }).sort({ createdAt: -1 });
  res.json(quotes);
});

// Save quote
router.put("/save/:id", auth, async (req, res) => {
  const quote = await Quote.findById(req.params.id);
  if(!quote) return res.status(404).json({ message: "Quote not found" });
  if(!quote.savedBy.includes(req.user.id)) quote.savedBy.push(req.user.id);
  await quote.save();
  res.json({ message: "Saved" });
});

// Delete quote
router.delete("/:id", auth, async (req, res) => {
  const quote = await Quote.findOne({ _id: req.params.id, userId: req.user.id });
  if(!quote) return res.status(404).json({ message: "Quote not found or not authorized" });
  await quote.remove();
  res.json({ message: "Deleted" });
});

module.exports = router;
