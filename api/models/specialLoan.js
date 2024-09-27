const mongoose = require("mongoose");

const specialLoanSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    principal: {
      type: Number,
      required: true,
    },
    interest: {
      type: Number,
    },
    totalLoan: {
      type: Number,
    },
  },
  { timestamps: true }
);

const specialLoan = mongoose.model("SpecialLoan", specialLoanSchema);

module.exports = specialLoan;
