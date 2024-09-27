import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const EditLoanForm = ({ loan, fetchLoans, setIsEditing }) => {
  const [principal, setPrincipal] = useState(loan.principal);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/admin/sloans/${loan._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ principal }),
      });
      fetchLoans(); // Refresh loans after update
      setIsEditing(false); // Close the form after editing
    } catch (error) {
      console.error("Error updating loan:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border">
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

      <button type="submit" className="bg-green-500 text-white px-4 py-2">
        Update Loan
      </button>
    </form>
  );
};

// Define PropTypes for EditLoanForm
EditLoanForm.propTypes = {
  loan: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    principal: PropTypes.number.isRequired,
  }).isRequired,
  fetchLoans: PropTypes.func.isRequired,
  setIsEditing: PropTypes.func.isRequired,
};

export default EditLoanForm;
