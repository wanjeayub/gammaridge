const express = require("express");
const {
  approveLoan,
  getLoans,
  registerAdmin,
  loginAdmin,
  applySpecialLoan,
  getSpecialLoans,
  editSpecialLoan,
  deleteSpecialLoan,
  payLoan,
} = require("../controllers/adminController.js");
const { adminProtect, protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/loans", adminProtect, getLoans);
router.put("/loan/:id", adminProtect, approveLoan);
router.put("/loan/repay/:id",adminProtect,payLoan);
router.post("/sloan", adminProtect, applySpecialLoan);
router.get("/sloans", adminProtect, getSpecialLoans);
router.put("/sloans/:id", adminProtect, editSpecialLoan);
router.delete("/sloans/:id", adminProtect, deleteSpecialLoan);

module.exports = router;
