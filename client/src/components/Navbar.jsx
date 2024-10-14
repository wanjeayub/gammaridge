import { Link } from "react-router-dom";
import { MdOutlineMenuOpen } from "react-icons/md";

function Navbar() {
  return (
    <div className="shadow-lg">
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
            <span className="hover:underline font-semibold hidden md:flex text-white">
              What we do
            </span>
          </Link>
          <Link to={"/contact"}>
            <span className="hover:underline font-semibold hidden md:flex text-white">
              Contact
            </span>
          </Link>

          {/* <Link to={"/login"}>
            <span className="text-[#255C99] font-semibold border-[#255C99] rounded-md border-2 px-3 py-2 hover:bg-slate-200">
              Login
            </span>
          </Link>
          <Link to={"/register"}>
            <span className="text-white font-semibold bg-[#6D1321] rounded-md px-3 py-2 hover:opacity-80 border-2 border-[#6D1321]">
              Register
            </span>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
