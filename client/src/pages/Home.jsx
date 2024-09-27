import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="p-2">
      <div className="flex flex-col">
        <h1>Welcome</h1>
        <p>Welcome do gammaridge solutions. To proceed, please register</p>
      </div>
      <div>
        <Link to={"/register"}>
          <button className="bg-blue-700 text-teal-50 p-2 rounded-md">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
