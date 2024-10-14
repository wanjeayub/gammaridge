import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="shadow-md mb-4">
      <div className="max-w-6xl mx-auto p-3 flex flex-row justify-between items-center">
        <div className="text-xl">
          <Link to="/">
            <span className="text-[#262626] font-bold">Gamma</span>
            <span className="text-[#B3001B] font-bold">ridge</span>
          </Link>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <Link to={"/services"}>
            <span className="hover:underline font-semibold hidden md:flex">
              What we do
            </span>
          </Link>
          <Link to={"/contact"}>
            <span className="hover:underline font-semibold hidden md:flex">
              Contact
            </span>
          </Link>
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
