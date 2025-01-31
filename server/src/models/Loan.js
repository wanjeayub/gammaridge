const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  loanAmount: { type: Number, required: true }, // Total loan amount
  interest: { type: Number, required: true }, // Total interest
  totalRepayment: { type: Number, required: true }, // loanAmount + interest
  paidAmount: { type: Number, default: 0 }, // Amount paid so far
  remainingBalance: { type: Number, required: true }, // totalRepayment - paidAmount
  status: {
    type: String,
    enum: ["pending", "approved", "partially paid", "fully paid"],
    default: "pending",
  },
  repaymentDate: { type: Date, required: true }, // Due date for repayment
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Loan", loanSchema);
