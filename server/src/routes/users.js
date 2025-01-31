const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware/authMiddleware.js");

// Fetch current user profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put("/update-profile", authMiddleware, async (req, res) => {
  const {
    fullName,
    email,
    mobileNumber,
    alternateMobileNumber,
    profilePhoto,
    idFrontPhoto,
    idBackPhoto,
    idNumber,
  } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        fullName,
        email,
        mobileNumber,
        alternateMobileNumber,
        profilePhoto,
        idFrontPhoto,
        idBackPhoto,
        idNumber,
      },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Change password
router.put("/change-password", authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    // Find the user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Verify the current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Current password is incorrect." });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password changed successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
});

module.exports = router;
