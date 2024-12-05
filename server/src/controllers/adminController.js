const Loan = require("../models/loanModel.js");
const specialLoan = require("../models/specialLoan.js");
const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
// Register Admin
const registerAdmin = async (req, res) => {
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

  try {
    const newAdmin = new User({
      name,
      email,
      password,
      mobile,
      alternatemobile,
      photoURLFront,
      photoURLBack,
      terms,
      role: "admin", // Set role to admin
    });

    // save admin
    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering admin" });
    console.log(error);
  }
};

// Login admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await User.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({ _id: admin._id, token: generateToken(admin._id) });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
};
// edit admin details
const editAdminDetails = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating admin details" });
  }
};

// Get all loans
const getLoans = async (req, res) => {
  const loans = await Loan.find().populate(
    "user",
    "name mobile alternatemobile photoURLFront"
  );
  res.json(loans);
};

// Approve or reject loan
const approveLoan = async (req, res) => {
  const loan = await Loan.findById(req.params.id);
  if (!loan) return res.status(404).json({ message: "Loan not found" });

  loan.status = req.body.status;
  await loan.save();
  res.json(loan);
};

// pay loan
const payLoan = async (req, res) => {
  try {
    const id = req.params.id;
    const loan = await Loan.findById(id);

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    loan.isPaid = true;
    await loan.save();

    res.status(200).json({ message: "Loan marked as paid", loan });
  } catch (error) {
    res.status(500).json({ message: "Error updating loan status", error });
  }
};

// get pending loans
const getPendingLoans = async (req, res) => {
  try {
    const pendingLoans = await Loan.find({ status: "pending" });
    res.status(200).json(pendingLoans);
  } catch (error) {
    console.error("Error fetching pending loans:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get approved loans
const getApprovedLoans = async (req, res) => {
  try {
    const approvedLoans = await Loan.find({ status: "approved" });
    res.status(200).json(approvedLoans);
  } catch (error) {
    console.error("Error fetching pending loans:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// get rejected loans
const getRejectedLoans = async (req, res) => {
  try {
    const rejectedLoans = await Loan.find({ status: "rejected" });
    res.status(200).json(rejectedLoans);
  } catch (error) {
    console.error("Error fetching pending loans:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get paid loans
const getPaidLoans = async (req, res) => {
  try {
    const paidLoans = await Loan.find({ isPaid: true });
    res.status(200).json(paidLoans);
  } catch (error) {
    console.error("Error fetching paid loans: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name mobile photoURLFront");
    res.json(users);
  } catch (err) {
    console.error("Error retrieving users", err);
    res.status(500).send("Error retrieving users");
  }
};

// SPECIAL LOANS - This feature is shelved for now

// add special loan
const applySpecialLoan = async (req, res) => {
  const { fullname, principal } = req.body;
  const myPrincipal = parseFloat(principal);
  const interest = 0.2 * myPrincipal;
  const totalLoan = parseFloat(myPrincipal + interest);

  const myLoan = await specialLoan.create({
    fullname,
    principal: myPrincipal,
    interest,
    totalLoan,
  });

  res.status(201).json(myLoan);
};

// Get special Loans
const getSpecialLoans = async (req, res) => {
  const myLoans = await specialLoan.find();
  res.status(200).json(myLoans);
};

// edit special loan
const editSpecialLoan = async (req, res) => {
  const { principal } = req.body;
  const myPrincipal = parseFloat(principal);
  const interest = 0.2 * myPrincipal;
  const totalLoan = parseFloat(interest + myPrincipal);
  try {
    const sloan = await specialLoan.findByIdAndUpdate(
      req.params.id,
      { principal: myPrincipal, interest, totalLoan },
      { new: true }
    );
    if (!sloan) return res.status(404).json({ message: "Loan not found" });
    res.status(200).json(sloan);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// delete special loan
const deleteSpecialLoan = async (req, res) => {
  try {
    const loan = await specialLoan.findByIdAndDelete(req.params.id);
    if (!loan) return res.status(404).json({ message: "Loan not found" });
    res.status(200).json({ message: "Loan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getLoans,
  getAllUsers,
  approveLoan,
  payLoan,
  registerAdmin,
  loginAdmin,
  editAdminDetails,
  getPendingLoans,
  getApprovedLoans,
  getRejectedLoans,
  getPaidLoans,
  applySpecialLoan,
  getSpecialLoans,
  editSpecialLoan,
  deleteSpecialLoan,
};
