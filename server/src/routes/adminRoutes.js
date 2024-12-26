const express = require("express");
const {
  approveLoan,
  getLoans,
  registerAdmin,
  loginAdmin,
  payLoan,
  getPendingLoans,
  getApprovedLoans,
  getRejectedLoans,
  getPaidLoans,
  editAdminDetails,
  getAllUsers,
} = require("../controllers/adminController.js");
const { adminProtect, protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.put("/edit", adminProtect, editAdminDetails);

// Loan routes
router.get("/loans", adminProtect, getLoans);
router.put("/loan/:id", adminProtect, approveLoan);
router.put("/loan/repay/:id", adminProtect, payLoan);
router.get("/users", adminProtect, getAllUsers);

// pending loans
router.get("/loans/pending", adminProtect, getPendingLoans);
router.get("/loans/approved", adminProtect, getApprovedLoans);
router.get("/loans/rejected", adminProtect, getRejectedLoans);
router.get("/loans/paid", adminProtect, getPaidLoans);

module.exports = router;
