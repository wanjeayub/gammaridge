// routes/adminRoutes.js
const express = require("express");
// const adminController = require("../controllers/AdminController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const isAdmin = require("../middleware/authenticate.js");

const router = express.Router();

// Secure all routes with authentication and admin authorization
router.use(authMiddleware, isAdmin);

router.get("/summary", async (req, res) => {
  try {
    const totalBorrowed = await Loan.aggregate([
      { $group: { _id: null, total: { $sum: "$loanAmount" } } },
    ]);
    // Total users registered (excluding admins)
    const totalUsers = await User.countDocuments({ role: { $ne: "admin" } });
    const totalInterest = await Loan.aggregate([
      { $group: { _id: null, total: { $sum: "$interest" } } },
    ]);

    res.status(200).json({
      totalBorrowed: totalBorrowed[0]?.total || 0,
      totalUsers,
      totalInterest: totalInterest[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch summary data." });
  }
});
router.get("/loans", async (req, res) => {
  try {
    const { filter } = req.query;
    const now = new Date();
    let query = {};

    switch (filter) {
      case "day":
        query.createdAt = { $gte: startOfDay(now), $lte: endOfDay(now) };
        break;
      case "week":
        query.createdAt = { $gte: startOfWeek(now), $lte: endOfWeek(now) };
        break;
      case "month":
        query.createdAt = { $gte: startOfMonth(now), $lte: endOfMonth(now) };
        break;
      default:
        break;
    }

    const loans = await Loan.find(query).populate("userId", "fullName");
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch loans." });
  }
});
router.get("/activity-logs", async (req, res) => {
  try {
    const logs = await ActivityLog.find().populate("userId", "fullName");
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch activity logs." });
  }
});
router.get("/loan-stats", async (req, res) => {
  try {
    const stats = await LoanStat.findOne();
    res.status(200).json(stats || { approved: 0, pending: 0, fullyPaid: 0 });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch loan statistics." });
  }
});
router.get("/users", async (req, res) => {
  //  -removed from filter below isActive
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users." });
  }
});
router.put("/toggle-user-status/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({ message: "User status updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle user status." });
  }
});
router.get("/notifications", async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ timestamp: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notifications." });
  }
});
router.put("/change-credentials", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await User.findOne({ role: "admin" });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    admin.username = username;
    admin.password = password;
    await admin.save();

    res
      .status(200)
      .json({ message: "Admin credentials updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to update admin credentials." });
  }
});
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: "User deleted successfully" });
});

module.exports = router;
