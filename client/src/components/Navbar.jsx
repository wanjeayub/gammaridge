import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMenuOpen } from "react-icons/md";
import { useState, useEffect } from "react";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://gammaridge-server.vercel.app/api/users/user",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setUser(null); // Handle invalid token or unauthorized user
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null); // Update user state to reflect logged-out status
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="shadow-lg sticky top-0 z-50 bg-[#2d2d2d]">
      <div className="flex items-center justify-between p-3 max-w-6xl mx-auto">
        {/* Logo */}
        <div className="text-xl">
          <Link to="/">
            <span className="text-[#eeeeee] font-bold">Gamma</span>
            <span className="text-[#b9283b] font-bold">ridge</span>
          </Link>
        </div>

        {/* Navigation Links and User Section */}
        <div className="flex items-center gap-3">
          {/* Menu Icon for Mobile */}
          <MdOutlineMenuOpen className="text-3xl text-white hover:text-[#b9283b] md:hidden" />

          {/* Other Services Link */}
          <Link to="/services">
            <span className="hover:underline font-semibold hidden md:flex text-[#eeeeee]">
              Other Services
            </span>
          </Link>

          {/* Conditional Rendering: Login/Register or User Info */}
          {!user ? (
            <>
              <Link to="/login">
                <span className="text-[#255C99] font-semibold border-[#255C99] rounded-md border-2 px-3 py-2 hover:bg-slate-200">
                  Login
                </span>
              </Link>
              <Link to="/register">
                <span className="text-white font-semibold bg-[#6D1321] rounded-md px-3 py-2 hover:opacity-80 border-2 border-[#6D1321]">
                  Register
                </span>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              {/* User Profile Image */}
              <Link to="/dashboard">
                <img
                  src={
                    user.profileImage ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-[#eeeeee] cursor-pointer"
                />
              </Link>
              {/* User Name */}
              <Link to="/dashboard">
                <span className="text-white hover:underline">{user.name}</span>
              </Link>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-[#eeeeee] bg-[#6D1321] hover:opacity-80 px-3 py-2 rounded-md font-semibold border-2 border-[#6D1321]"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
