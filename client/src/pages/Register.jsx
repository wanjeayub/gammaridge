import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    alternatephone: "",
    password: "",
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
    <div className="container mx-auto">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="border p-2 w-full"
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Mobile Number"
          required
          className="border p-2 w-full"
        />
        <input
          name="alternatephone"
          value={formData.alternatephone}
          onChange={handleChange}
          placeholder="Alternate Mobile Number"
          required
          className="border p-2 w-full"
        />
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
          className="bg-[#6D1321] text-white py-2 px-4 w-full rounded-md"
        >
          Register
        </button>
      </form>
      <div>
        <p className="max-w-md mx-auto space-y-4">
          Already registered? <span className="text-green-700">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
