const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  alternateMobileNumber: { type: String, required: true },
  profilePhoto: { type: String, required: true }, // Firebase Storage URL
  idFrontPhoto: { type: String, required: true }, // Firebase Storage URL
  idBackPhoto: { type: String, required: true }, // Firebase Storage URL
  idNumber: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  loans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Loan" }],
});

module.exports = mongoose.model("User", userSchema);
