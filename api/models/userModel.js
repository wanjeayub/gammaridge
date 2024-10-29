const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  alternatemobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  terms: { type: Boolean, required: true, default: false },
  photoURLFront: {
    type: String,
  },
  photoURLBack: {
    type: String,
  },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  loan: { type: mongoose.Schema.Types.ObjectId, ref: "Loan", required: true },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
