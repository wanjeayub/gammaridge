const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db.js");
const authRoutes = require("./src/routes/auth.js");
const loanRoutes = require("./src/routes/loans.js");
const userRoutes = require("./src/routes/users.js");
const adminRoutes1 = require("./src/routes/admin.routes.js");
const adminRoutes = require("./src/routes/adminRoutes.js");

dotenv.config();

const app = express();
// use var to prevent future bugs on render
var __dirname = path.resolve();

// Middleware
app.use(
  cors({
    origin: ["*", "https://gammaridge.vercel.app", "http://localhost:5173"],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Routes
app.use("/api/users", authRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes1);
app.use("/api/admin", adminRoutes);

// Database Connection
connectDB();

// test
app.use("/", (req, res) => {
  res.status(200).json("system upgrade successfull");
});

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
