const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const Loan = require("../models/loanModel.js");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({ _id: user._id, token: generateToken(user._id) });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({ _id: user._id, token: generateToken(user._id) });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
};

// Apply for Loan
const applyLoan = async (req, res) => {
  const { amount, duration } = req.body;

  const loan = await Loan.create({ user: req.user._id, amount, duration });

  res.status(201).json(loan);
};

// Get User Loans
const getUserLoans = async (req, res) => {
  const loans = await Loan.find({ user: req.user._id });
  res.json(loans);
};

module.exports = { registerUser, loginUser, applyLoan, getUserLoans };
