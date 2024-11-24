import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "https://gammaridge-server.vercel.app/api/users/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Password reset email sent successfully. Check your inbox.");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setError("Failed to send reset email. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-700">
      <div className="bg-gray-300 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="bg-gray-600 text-white px-3 py-2 rounded-md border focus:outline-none focus:ring-0 focus:border-[#b9283b]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#b9283b] rounded-md text-white py-2 px-4 w-full"
          >
            Send Reset Email
          </button>
        </form>
        {message && (
          <p className="text-green-500 mt-4 text-center">{message}</p>
        )}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
