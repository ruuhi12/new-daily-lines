const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const cors = require("cors");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

app.use(cors());
app.use(express.json());

app.use(cors({
  origin: "https://dailylines-cad.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json());


mongoose.connect("mongodb+srv://admin:L4rxvmJmG42QohGq@cluster0.ikekv48.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/quotes", require("./routes/quotes"));

app.listen(3000, () => {
  console.log("Server running");
});

