const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();

/* 🔴 CORS MUST BE FIRST */
app.use(cors({
  origin: "https://new-daily-lines.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

/* 🔴 Parse JSON BEFORE routes */
app.use(express.json());

/* Routes */
app.use("/api/auth", authRoutes);

/* Test route */
app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));



mongoose.connect("mongodb+srv://admin:L4rxvmJmG42QohGq@cluster0.ikekv48.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/quotes", require("./routes/quotes"));

app.listen(3000, () => {
  console.log("Server running");
});

