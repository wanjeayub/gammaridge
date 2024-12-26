const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const Loan = require("../models/loanModel.js");
const bcrypt = require("bcryptjs");

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
  const { email, newPassword } = req.body;

  // Validate input
  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ message: "Email and new password are required." });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Hash the new password
    // const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
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
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password from the response
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details", error });
  }
};

// try loan
const tryLoan = async (req, res) => {
  res.status(200).json({ message: "am tired of trying" });
};

// new loan function
exports.applyForLoan = async (req, res) => {
  const { amount } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ message: "Invalid loan amount" });
  }

  try {
    const userId = req.user.id;
    const newLoan = new Loan({
      userId,
      amount,
      interest: calculateInterest(amount), // Assuming you have a function to calculate interest
      totalLoan: calculateTotalLoan(amount), // Assuming you have a function to calculate total loan
      status: "pending", // New loan is pending by default
      isPaid: false,
      dueDate: calculateDueDate(), // Assuming you have a function to calculate due date
    });

    await newLoan.save();
    res.status(201).json(newLoan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error applying for loan" });
  }
};

// calculate due date
function calculateDueDate() {
  const currentDate = new Date();
  // Set the date to the 1st of the next month
  currentDate.setMonth(currentDate.getMonth() + 1);
  currentDate.setDate(3); // Set the day to the 3rd of the month
  return currentDate.toLocaleDateString();
}
// Apply for Loan
const applyLoan = async (req, res) => {
  const { amount } = req.body;
  const myAmount = parseFloat(amount);
  const interest = 0.2 * myAmount;
  const totalLoan = parseFloat(myAmount + interest);

  // converting the due date
  const isoDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    3
  );

  const date = new Date(isoDate);

  // Format to only show the date
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dueDate = date.toLocaleDateString("en-US", options);

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
    dueDate,
  });

  res.status(201).json(loan);
};

// Controller to edit an existing loan
const editLoan = async (req, res) => {
  const { id } = req.params; // Extract the id from the request parameters
  const { amount } = req.body; // Extract the new amount from the request body

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ message: "Invalid loan amount" });
  }

  try {
    // Find the loan by ID
    const loan = await Loan.findById(id);

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    // Ensure the loan has not been paid before allowing edits
    if (loan.isPaid) {
      return res.status(400).json({ message: "Cannot edit a paid loan" });
    }

    // Update the loan amount and recalculate dependent fields

    const myAmount = parseFloat(amount);
    const interest = 0.2 * myAmount;
    const totalLoan = parseFloat(myAmount + interest);

    loan.amount = myAmount;
    loan.interest = interest; // Recalculate interest based on the new amount
    loan.totalLoan = totalLoan; // Recalculate the total loan (amount + interest)
    loan.dueDate = calculateDueDate(); // Recalculate due date (the 3rd of the following month)

    // Save the updated loan to the database
    await loan.save();

    // Return the updated loan as the response
    res.status(200).json(loan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error editing loan" });
  }
};

// Helper function to calculate the due date (3rd of the following month)
function calculateDueDate() {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + 1); // Move to next month
  currentDate.setDate(3); // Set the date to the 3rd of the month
  return currentDate.toISOString(); // Return the ISO string of the date
}

// update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { name, email, password, mobile, alternatemobile, photoURLFront } =
      req.body;

    const updatedData = {
      name,
      email,
      mobile,
      alternatemobile,
      photoURLFront, // Save photo URL from Firebase
      ...(password && { password: bcrypt.hashSync(password, 10) }),
    };

    const user = await User.findByIdAndUpdate(req.user.id, updatedData, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating profile" });
  }
};

// new delete loan controller
const deleteLoan = async (req, res) => {
  const { id } = req.params;

  try {
    const loan = await Loan.findById(id);

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    if (loan.isPaid || loan.status === "approved") {
      return res
        .status(400)
        .json({ message: "Cannot delete a paid or approved loan" });
    }

    await Loan.deleteOne({ _id: id });
    res.status(200).json({ message: "Loan deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting loan" });
  }
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
  updateUserProfile,
  editLoan,
  deleteLoan,
  tryLoan,
  getUser,
  getUserLoans,
};
