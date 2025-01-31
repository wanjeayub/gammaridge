// routes/adminRoutes.js
const express = require("express");
const adminController = require("../controllers/AdminController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const isAdmin = require("../middleware/authenticate.js");

const router = express.Router();

// Secure all routes with authentication and admin authorization
router.use(authMiddleware, isAdmin);

router.get("/summary", adminController.getSummary);
router.get("/loans", adminController.getLoans);
router.get("/activity-logs", adminController.getActivityLogs);
router.get("/loan-stats", adminController.getLoanStats);
router.get("/users", adminController.getUsers);
router.put("/toggle-user-status/:userId", adminController.toggleUserStatus);
router.get("/notifications", adminController.getNotifications);
router.put("/change-credentials", adminController.updateCredentials);
router.delete("/delete/:id", adminController.deleteAllForUser);

module.exports = router;
