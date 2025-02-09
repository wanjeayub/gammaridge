import { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function GarbageCollection() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.fullName || !formData.phoneNumber || !formData.location) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      // Simulate API request
      const response = await toast.promise(
        axios.post("/api/request-cleanup", formData),
        {
          loading: "Submitting request...",
          success: "Request submitted successfully!",
          error: "Failed to submit request.",
        }
      );

      // Log the response (for debugging)
      console.log("API Response:", response.data);

      // Reset form
      setFormData({
        fullName: "",
        phoneNumber: "",
        location: "",
      });
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Request Garbage Collection
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Join thousands of happy customers who enjoy hassle-free, eco-friendly
          garbage collection services. We make it easy for you to keep your
          surroundings clean and green!
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="+1234567890"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="123 Main St, City"
              required
            />
          </div>
          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit Request
            </motion.button>
          </div>
        </form>
        <p className="text-xs text-gray-500 text-center mt-6">
          By submitting this form, you agree to our{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            terms and conditions
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
}

export default GarbageCollection;
