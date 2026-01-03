const express = require("express");
const router = express.Router();
const Quote = require("../models/Quote");

/* CREATE quote */
router.post("/", async (req, res) => {
  const quote = new Quote({ text: req.body.text });
  await quote.save();
  res.json(quote);
});

/* GET all quotes */
router.get("/", async (req, res) => {
  const quotes = await Quote.find().sort({ createdAt: -1 });
  res.json(quotes);
});

/* SAVE / UNSAVE */
router.put("/save/:id", async (req, res) => {
  const quote = await Quote.findById(req.params.id);
  quote.saved = !quote.saved;
  await quote.save();
  res.json(quote);
});

/* DELETE everywhere */
router.delete("/:id", async (req, res) => {
  await Quote.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
