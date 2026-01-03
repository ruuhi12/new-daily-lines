const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  "https://new-daily-lines.vercel.app"
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow non-browser clients like Postman
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `CORS policy: This origin ${origin} is not allowed.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
const quotesRoutes = require("./routes/quotes");

app.use(express.json());
app.use("/api/quotes", quotesRoutes);

/* 🔴 CORS MUST BE FIRST */
// app.use(cors({
//   origin: "https://new-daily-lines.vercel.app",
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));

/* 🔴 Parse JSON BEFORE routes */


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

