import { useState } from "react";

import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import app from "../firebase/firebase";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const storage = getStorage(app);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    alternatemobile: "",
    photo: null,
    terms: false,
  });

  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle file (photo) change separately
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, mobile, alternatemobile, photo, terms } =
      formData;

    // Validate form data
    if (
      !name ||
      !email ||
      !password ||
      !mobile ||
      !alternatemobile ||
      !photo ||
      terms == false
    ) {
      alert("All fields are required.");
      return;
    }

    // Validate that mobile numbers are different
    if (mobile === alternatemobile) {
      alert("Mobile numbers cannot be the same.");
      return;
    }

    setLoading(true);

    try {
      // Upload photo to Firebase
      const photoRef = ref(storage, `users/${Date.now()}-${photo.name}`);
      const snapshot = await uploadBytes(photoRef, photo);
      const photoURL = await getDownloadURL(snapshot.ref);
      // log url
      console.log(photoURL);
      // Save data to backend (MongoDB)
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          mobile,
          alternatemobile,
          photoURL,
          terms,
        }),
      });

      const result = await response.json();
      window.location.href = "/login";
      console.log(result.message);
    } catch (error) {
      console.error("Error uploading photo or saving data:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 text-white">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-[600px] hidden md:block">Side</div>
        <form onSubmit={handleSubmit} className="md:w-[600px] p-3 w-full">
          <div>
            <label className="block">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-600 text-gray-900 px-3 py-2 rounded-md border focus:outline-none focus:ring-0 focus:border-[#b9283b] w-full"
            />
          </div>

          <div>
            <label className="block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-600 text-gray-900 px-3 py-2 rounded-md border focus:outline-none focus:ring-0 focus:border-[#b9283b] w-full"
            />
          </div>

          <div>
            <label className="block">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-600 text-gray-900 px-3 py-2 rounded-md border focus:outline-none focus:ring-0 focus:border-[#b9283b] w-full"
            />
          </div>

          <div>
            <label className="block">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="bg-gray-600 text-gray-900 px-3 py-2 rounded-md border focus:outline-none focus:ring-0 focus:border-[#b9283b] w-full"
            />
          </div>

          <div>
            <label className="block">Alternate Mobile</label>
            <input
              type="text"
              name="alternatemobile"
              value={formData.alternatemobile}
              onChange={handleChange}
              className="bg-gray-600 text-gray-900 px-3 py-2 rounded-md border focus:outline-none focus:ring-0 focus:border-[#b9283b] w-full"
            />
          </div>

          <div>
            <label className="block">Photo</label>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              />
              <span className="ml-2">I agree to the terms and conditions</span>
            </label>
          </div>

          <button
            type="submit"
            className="bg-[#b9283b] w-full text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <div className="mt-3">
            Already have an account?{" "}
            <Link to={"/login"}>
              <span className="text-[#b9283b]">Login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
