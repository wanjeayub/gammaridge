import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="text-white max-w-6xl mx-auto">
      <div className="p-3">
        <div className="mb-4">
          <p className="text-3xl">Sign in with email</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="bg-gray-600 text-gray-900 px-3 py-2 rounded-md border focus:outline-none focus:ring-0 focus:border-[#b9283b]"
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="bg-gray-600 text-gray-900 px-3 py-2 rounded-md border focus:outline-none focus:ring-0 focus:border-[#b9283b]"
          />
          <button
            type="submit"
            className="bg-[#b9283b] rounded-md text-white py-2 px-4 w-full"
          >
            Login
          </button>
        </form>
        <div className="max-w-md mx-auto space-y-4">
          <p>
            No account?
            <Link to="/register">
              <span className="text-green-700">register</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
