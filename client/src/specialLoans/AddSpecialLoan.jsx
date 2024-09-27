import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const AddLoan = ({ fetchLoans }) => {
  const [fullname, setFullName] = useState("");
  const [principal, setPrincipal] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/admin/sloan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ fullname, principal }),
      });
      fetchLoans(); // Refresh loans after adding
    } catch (error) {
      console.error("Error adding loan:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border">
      <div className="mb-4">
        <label className="block">Full name: </label>
        <input
          type="text"
          value={fullname}
          placeholder="Enter full name"
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block">Loan Amount</label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          className="w-full border p-2"
          required
        />
      </div>
      {/* interest */}
      {/* This value is calculated from the backend */}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Add Loan
      </button>
    </form>
  );
};

// Define PropTypes for AddLoan
AddLoan.propTypes = {
  fetchLoans: PropTypes.func.isRequired,
};

export default AddLoan;
