const express = require("express");

const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./src/routes/userRoutes.js");
const adminRoutes = require("./src/routes/adminRoutes.js");

const app = express();
const cors = require("cors");
// use var to prevent future bugs on render
var __dirname = path.resolve();

app.use(
  cors({
    origin: ["*"],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"));

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// test
app.use("/", (req, res) => {
  res.status(200).json("good");
});

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(5000, () => console.log("Server running on port 5000"));
