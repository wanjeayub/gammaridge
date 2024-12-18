import { Link } from "react-router-dom";
import { MdOutlineMenuOpen } from "react-icons/md";
import { useState, useEffect } from "react";

function Navbar() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        "https://gammaridge-server.vercel.app/api/users/user",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, []);
  return (
    <div className="shadow-lg sticky top-0 z-50 bg-[#2d2d2d]">
      <div className="flex items-center justify-between p-3 max-w-6xl mx-auto">
        <div className="text-xl">
          <Link to="/">
            <span className="text-[#eeeeee] font-bold">Gamma</span>
            <span className="text-[#b9283b] font-bold">ridge</span>
          </Link>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <MdOutlineMenuOpen className="text-3xl text-white hover:text-[#b9283b] md:hidden" />
          <Link to={"/services"}>
            <span className="hover:underline font-semibold hidden md:flex text-[#eeeeee]">
              Other Services
            </span>
          </Link>

          {/* Conditionally render Login or Profile Image */}
          {!user ? (
            <>
              <Link to={"/login"}>
                <span className="text-[#255C99] font-semibold border-[#255C99] rounded-md border-2 px-3 py-2 hover:bg-slate-200">
                  Login
                </span>
              </Link>
              <Link to={"/register"}>
                <span className="text-white font-semibold bg-[#6D1321] rounded-md px-3 py-2 hover:opacity-80 border-2 border-[#6D1321]">
                  Register
                </span>
              </Link>
            </>
          ) : (
            <div className="flex flex-row gap-2 items-center">
              <div>
                <Link to={"/dashboard"}>
                  <img
                    src={
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    } // Assuming `user.profileImage` contains the image URL
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-[#eeeeee] cursor-pointer"
                  />
                </Link>
              </div>
              <div>
                <Link to={"/dashboard"}>
                  <span className="text-white hover:underline">
                    {user.name}
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
