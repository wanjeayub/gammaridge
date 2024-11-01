const express = require("express");
const {
  registerUser,
  loginUser,
  applyLoan,
  getUserLoans,
} = require("../controllers/userController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();
// url testing
router.get("/testing", (req, res) => {
  res.status(200).json(message, "working okay");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/loan", protect, applyLoan);
router.get("/loans", protect, getUserLoans);

module.exports = router;
