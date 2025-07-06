const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const requestRoutes = require("./routes/requestRoutes");

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:3000", // your frontend origin
  credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));

const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3000", // your frontend origin
  credentials: true
}));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/request", requestRoutes);

// Connect DB and Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running on port", process.env.PORT || 5000);
    });
  })
  .catch(err => console.log(err));
