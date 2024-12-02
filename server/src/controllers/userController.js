const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const Loan = require("../models/loanModel.js");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register
const registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    mobile,
    alternatemobile,
    photoURLFront,
    photoURLBack,
    terms,
  } = req.body;

  // Check if mobile numbers are the same (redundant as frontend should handle this too)
  if (mobile === alternatemobile) {
    return res
      .status(400)
      .json({ message: "Mobile numbers cannot be the same" });
  }

  const userExists = await User.findOne({ email });

  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const user = await User.create({
    name,
    email,
    password,
    mobile,
    alternatemobile,
    photoURLFront,
    photoURLBack,
    terms,
  });

  if (user) {
    res.status(201).json({ message: "User added successfully!" });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) res.status(404).json({ message: "User not found!" });

  if (user && (await user.matchPassword(password))) {
    res.json({ _id: user._id, token: generateToken(user._id) });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
};

// forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });

  console.log(email);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const resetToken = jwt.sign({ id: user.email }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  // Send reset email using Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    text: `Please use the following link to reset your password: https://gammaridge-server.vercel.app/reset-password/${resetToken}`,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error sending email" });
    }
    res.json({ message: "Password reset email sent" });
  });
};

// reset password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    res.json({ message: "Password successfully updated" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

// get user
const getUSer = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password from the response
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details", error });
  }
};

// Apply for Loan
const applyLoan = async (req, res) => {
  const { amount } = req.body;
  const myAmount = parseFloat(amount);
  const interest = 0.2 * myAmount;
  const totalLoan = parseFloat(myAmount + interest);

  const unpaidLoan = await Loan.findOne({ user: req.user._id, isPaid: false });

  if (unpaidLoan) {
    // User has an unpaid loan, block the new application
    return res.status(400).json({
      message:
        "You cannot apply for a new loan until the previous loan is fully paid.",
    });
  }

  const loan = await Loan.create({
    user: req.user._id,
    amount: myAmount,
    interest,
    totalLoan,
  });

  res.status(201).json(loan);
};

// Get User Loans
const getUserLoans = async (req, res) => {
  const loans = await Loan.find({ user: req.user._id });
  res.json(loans);
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  applyLoan,
  getUSer,
  getUserLoans,
};
