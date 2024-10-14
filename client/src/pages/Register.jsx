import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    alternatephone: "",
    password1: "",
    password2: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // Trim spaces and check uniqueness
    if (formData.alternatephone.trim() === formData.phone.trim()) {
      alert("The two phone numbers must be different.");
      return;
    }
    // confirm passwords
    if (formData.password1 != formData.password2)
      alert("passwords not matching! check and try again");

    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    if (response.ok) {
      // localStorage.setItem("token", data.token);
      window.location.href = "/docs";
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="p-4 text-white">
      <div>
        <div>Form content details</div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="bg-gray-600 text-white px-3 py-2 rounded-md border focus:outline-none focus:ring-0 focus:border-[#b9283b]"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
            className="bg-gray-600 text-white px-3 py-2 rounded-md border focus:outline-none focus:ring-0 focus:border-[#b9283b]"
          />
          <input
            name="alternatephone"
            value={formData.alternatephone}
            onChange={handleChange}
            placeholder="Alternate Mobile Number"
            required
            className="bg-gray-600 text-white px-3 py-2 rounded-md border focus:outline-none focus:ring-0 focus:border-[#b9283b]"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="bg-gray-600 text-white px-3 py-2 rounded-md border focus:outline-none focus:ring-0 focus:border-[#b9283b]"
          />
          <input
            name="password1"
            type="password"
            value={formData.password1}
            onChange={handleChange}
            placeholder="Password"
            required
            className="bg-gray-600 text-white px-3 py-2 rounded-md border focus:outline-none focus:ring-0 focus:border-[#b9283b]"
          />
          <input
            name="password2"
            type="password"
            value={formData.password2}
            onChange={handleChange}
            placeholder="confirm Password"
            required
            className="bg-gray-600 text-white px-3 py-2 rounded-md border focus:outline-none focus:ring-0 focus:border-[#b9283b]"
          />
          <button
            type="submit"
            className="bg-[#b9283b] text-white py-2 px-4 rounded-md"
          >
            Register
          </button>
        </form>
        <div>
          <p className="max-w-md mx-auto space-y-4">
            Already registered?{" "}
            <Link to={"/login"}>
              <span className="text-[#b9283b]">Login</span>
            </Link>
          </p>
        </div>
      </div>

      <div>side</div>
    </div>
  );
};

export default Register;
