// import cashInHand from "../assets/cashHand.webp";
import { Link } from "react-router-dom";
import moneyIMG from "../assets/img/money-img.jpg";
function Home() {
  // space-x-4
  return (
    <div className="flex p-3 max-w-6xl mx-auto text-white items-center flex-col md:flex-row">
      <div className="flex  flex-col p-3 max-w-1/2">
        <h1 className="text-5xl mb-4">
          Welcome to Gammaridge Financial Solutions!
        </h1>
        <p className="text-2xl mb-4">
          Your <span className="text-[#b9283b]">Trusted Partner</span> for
          Short-Term Loans
        </p>
        {/* <p className="text-xl mb-3">
          At GammaRidge, we provide{" "}
          <span className="text-[#B3001B]">fast, flexible, and affordable</span>{" "}
          short-term loans tailored to meet your urgent financial needs. Whether
          you’re covering unexpected expenses or bridging the gap between
          paychecks, we’ve got you covered.
        </p> */}
        {/* <p className="text-xl mb-3">Why Choose GammaRidge?</p>
        <ul className=" ml-5 text-xl ">
          <li>
            <p>
              <span className="font-semibold"> - Quick Approvals:</span> Apply
              in minutes, and get approval within hours.
            </p>
          </li>
          <li>
            <span className="font-semibold"> - Flexible Terms:</span> Choose a
            repayment plan that fits your budget.
          </li>
          <li>
            <span className="font-semibold"> - Transparent Fees:</span> No
            hidden charges—just clear, upfront costs.
          </li>
          <li>
            <span className="font-semibold"> - Trusted Support:</span> Our
            dedicated team is here to help you every step of the way.
          </li>
        </ul> */}
        <div className="mt-4">
          <Link to={"/login"}>
            <button className="bg-[#8f202e] rounded-3xl px-6 py-2 text-white">
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <div className="max-w-xl">
        <img src={moneyIMG} alt="hand recieving money" />
      </div>
    </div>
  );
}

export default Home;
