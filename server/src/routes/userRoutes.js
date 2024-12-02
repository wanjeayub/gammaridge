let cors = require("cors");
const express = require("express");
const {
  registerUser,
  loginUser,
  applyLoan,
  getUserLoans,
  resetPassword,
  forgotPassword,
  getUSer,
} = require("../controllers/userController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();
// url testing
router.get("/testing", (req, res) => {
  res.status(200).json(message, "working okay");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
// reset options
router.post("/fpassword", cors(), forgotPassword);
router.post("/rpassword/:token", resetPassword);

router.post("/apply", protect, applyLoan);
router.get("/user", protect, getUSer);
router.get("/loans", protect, getUserLoans);

module.exports = router;
