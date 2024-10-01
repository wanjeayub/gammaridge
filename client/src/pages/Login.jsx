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
    <div className="container mx-auto ">
      <div>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="border p-2 w-full"
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="border p-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 w-full"
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
