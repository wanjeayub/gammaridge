import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-600 p-3 mb-3">
      <div>
        <Link to="/">
          <span className="text-blue-500">Gamma</span>ridge
        </Link>
      </div>
      <div></div>
    </nav>
  );
}

export default Navbar;
