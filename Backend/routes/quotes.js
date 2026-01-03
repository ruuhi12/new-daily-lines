const express = require("express");
const router = express.Router();
const Quote = require("../models/Quote");
const auth = require("../middleware/auth");

// Get all quotes (for homepage feed)
router.get("/", auth, async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 }).limit(50); // latest 50 quotes
    res.json(quotes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user's own quotes
router.get("/my", auth, async (req, res) => {
  console.log("AUTH USER ID:", req.user.id);

  const quotes = await Quote.find({ userId: req.user.id });
  res.json(quotes);
});


// Get saved quotes
router.get("/saved", auth, async (req, res) => {
  const quotes = await Quote.find({
    savedBy: req.user.id,
    userId: { $ne: req.user.id }   // 🚨 THIS LINE
  }).sort({ createdAt: -1 });

  res.json(quotes);
});


router.post("/:id/save", auth, async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    const userId = req.user.userId;

    // prevent duplicate save
    if (quote.savedBy.includes(userId)) {
      return res.status(400).json({ message: "Already saved" });
    }

    quote.savedBy.push(userId);
    await quote.save();

    res.json({ message: "Quote saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a quote (only owner)
// DELETE quote (only owner can delete)
router.delete("/:id", auth, async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    // ownership check
    if (quote.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await quote.deleteOne();

    res.json({ message: "Quote deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/quotes
 * Create a new quote
 */
router.post("/", auth, async (req, res) => {
  try {
    console.log("REQ.USER IN POST:", req.user);
    console.log("REQ.BODY:", req.body);

    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const quote = new Quote({
      text,
      userId: req.user.id
    });

    await quote.save();

    res.status(201).json(quote);
  } catch (err) {
    console.error("POST QUOTE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
