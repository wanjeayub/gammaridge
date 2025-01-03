const express = require("express");

const {
  registerUser,
  loginUser,
  applyLoan,
  getUserLoans,
  resetPassword,
  forgotPassword,
  editLoan,
  deleteLoan,
  getUser,
  updateUserProfile,
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
// router.post("/fpassword", forgotPassword);
router.post("/pword-update", forgotPassword);
router.post("/rpassword/:token", resetPassword);

router.post("/loans/apply", protect, applyLoan);
router.put("/loans/edit/:id", protect, editLoan);
router.delete("/loans/delete/:id", protect, deleteLoan);
router.get("/user", protect, getUser);
// update user profile
router.put("/update", protect, updateUserProfile);
router.get("/loans", protect, getUserLoans);

module.exports = router;
