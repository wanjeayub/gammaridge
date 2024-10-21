import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/users/login", {
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
    <div className="text-white max-w-6xl justify-between mx-auto">
      <div className="flex flex-col md:flex-row mt-20 px-4">
        <div className="bg-[#b64b59] items-center justify-center p-16 hidden md:block md:w-[600px]">
          <p className="text-4xl text-center">
            Get up and running to access your loan
          </p>
        </div>

        <div className="flex flex-col p-6 w-full lg:w-[600px]">
          {/* side image */}
          <div className="mb-3">
            <p className="text-4xl text-center">Sign in with email</p>
            <p className="mt-2">
              Let&apos;s get you onboard the platform securely
            </p>
          </div>

          {/* form side */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
              className="bg-[#b9283b] rounded-md text-white py-2 px-4"
            >
              Login
            </button>
          </form>

          <div className="">
            <p className="mt-4">
              Don&apos;t have an account?
              <Link to="/register">
                <span className="text-[#b9283b]"> register</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
