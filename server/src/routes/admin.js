// const express = require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const Loan = require("../models/Loan");
// const User = require("../models/User");
// const authMiddleware = require("../middleware/authMiddleware");

// // Register
// router.post("/register", async (req, res) => {
//   const {
//     fullName,
//     email,
//     password,
//     mobileNumber,
//     alternateMobileNumber,
//     profilePhoto,
//     idFrontPhoto,
//     idBackPhoto,
//     idNumber,
//   } = req.body;

//   try {
//     // Check if email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "Email already in use." });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const user = new User({
//       fullName,
//       email,
//       password: hashedPassword,
//       mobileNumber,
//       alternateMobileNumber,
//       profilePhoto,
//       idFrontPhoto,
//       idBackPhoto,
//       idNumber,
//       role: "admin",
//     });

//     await user.save();
//     res.status(201).json({ message: "User registered successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ error: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1h",
//       }
//     );
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Fetch all users (Admin only)
// router.get("/users", authMiddleware, isAdmin, async (req, res) => {
//   try {
//     const users = await User.find().select("-password");
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Fetch all loans (Admin only)
// router.get("/loans", authMiddleware, isAdmin, async (req, res) => {
//   try {
//     const loans = await Loan.find().populate("userId", "fullName email");
//     res.json(loans);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Approve a loan (Admin only)
// router.put("/loans/:id/approve", authMiddleware, isAdmin, async (req, res) => {
//   try {
//     const loan = await Loan.findByIdAndUpdate(
//       req.params.id,
//       { status: "approved" },
//       { new: true }
//     );
//     res.json(loan);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Mark a loan as paid (Admin only)
// router.put(
//   "/loans/:id/markAsPaid",
//   authMiddleware,
//   isAdmin,
//   async (req, res) => {
//     try {
//       const loan = await Loan.findByIdAndUpdate(
//         req.params.id,
//         { status: "fully paid" },
//         { new: true }
//       );
//       res.json(loan);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// );
// // Approve a loan
// router.put("/loans/:id/approve", authMiddleware, async (req, res) => {
//   try {
//     const loan = await Loan.findByIdAndUpdate(
//       req.params.id,
//       { status: "approved" },
//       { new: true }
//     );
//     res.json(loan);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred. Please try again." });
//   }
// });

// // Mark a loan as fully paid
// router.put("/loans/:id/mark-paid", authMiddleware, async (req, res) => {
//   try {
//     const loan = await Loan.findByIdAndUpdate(
//       req.params.id,
//       { status: "fully paid" },
//       { new: true }
//     );
//     res.json(loan);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred. Please try again." });
//   }
// });

// // Record a partial payment
// router.put("/loans/:id/partial-pay", authMiddleware, async (req, res) => {
//   try {
//     const { amount } = req.body;
//     const loan = await Loan.findById(req.params.id);

//     if (!loan) {
//       return res.status(404).json({ error: "Loan not found." });
//     }

//     loan.paidAmount += amount;
//     if (loan.paidAmount >= loan.totalRepayment) {
//       loan.status = "fully paid";
//     } else {
//       loan.status = "partially paid";
//     }

//     await loan.save();
//     res.json(loan);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred. Please try again." });
//   }
// });

// module.exports = router;
