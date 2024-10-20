import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    alternatephone: "",
    password: "",
    agreedTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
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
      window.location.href = "/login";
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="p-4 text-white">
      <div className="flex md:flex-row ">
        <div className="md:w-1/2 p-3">
          <div className="p-3">
            <p className="text-5xl mb-6">
              Welcome to a <span className="text-[#b9283b]">platform</span> that
              will open opportunities!
            </p>
            <p className="text-xl mb-2">
              create an <span className="text-[#b9283b]">account</span> in
              simple and easy steps
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-2">
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
              name="password"
              type="password"
              value={formData.password1}
              onChange={handleChange}
              placeholder="Password"
              required
              className="bg-gray-600 text-white px-3 py-2 rounded-md border focus:outline-none focus:ring-0 focus:border-[#b9283b]"
            />

            <label
              className="flex flex-row gap-3 items-center p-3"
              htmlFor="agreedTerms"
            >
              <input
                type="checkbox"
                name="agreedTerms"
                checked={formData.agreedTerms}
                onChange={handleChange}
              />
              read our{" "}
              <Link to={"/terms"}>
                <span className="text-[#b9283b]">terms and conditions</span>
              </Link>
            </label>

            <button
              type="submit"
              className="bg-[#b9283b] text-white py-2 px-4 rounded-md max-w-40"
            >
              Register
            </button>
          </form>
          <div className="p-3">
            <p className="">
              Already registered?{" "}
              <Link to={"/login"}>
                <span className="text-[#b9283b]">Login</span>
              </Link>
            </p>
          </div>
        </div>
        {/* side div with image */}
        <div className="hidden md:block bg-yellow-900 md:w-1/2">side</div>
      </div>
    </div>
  );
};

export default Register;
