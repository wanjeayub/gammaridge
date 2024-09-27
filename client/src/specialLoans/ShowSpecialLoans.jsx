import { useEffect, useState } from "react";
import LoanList from "./SpecialLoanEdit";
import AddLoan from "./AddSpecialLoan";

const ShowSpecialLoans = () => {
  const [loans, setLoans] = useState([]);

  const fetchLoans = async () => {
    try {
      const response = await fetch("/api/admin/sloans", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setLoans(data);
    } catch (error) {
      console.error("Error fetching loans:", error);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <AddLoan fetchLoans={fetchLoans} />
      <LoanList loans={loans} fetchLoans={fetchLoans} />
    </div>
  );
};

export default ShowSpecialLoans;
