// import cashInHand from "../assets/cashHand.webp";
function Home() {
  // space-x-4
  return (
    <div className="flex p-3 max-w-5xl">
      <div className="flex  flex-col p-3">
        <h1 className="text-4xl mb-3 font-semibold">
          Welcome to Gammaridge Financial Solutions!
        </h1>
        <p className="text-2xl mb-3 font-semibold">
          Your <span className="text-[#6D1321]">Trusted Partner</span> for
          Short-Term Loans
        </p>
        <p className="text-xl mb-3">
          At GammaRidge, we provide{" "}
          <span className="text-[#B3001B]">fast, flexible, and affordable</span>{" "}
          short-term loans tailored to meet your urgent financial needs. Whether
          you’re covering unexpected expenses or bridging the gap between
          paychecks, we’ve got you covered.
        </p>
        <p className="text-xl mb-3">Why Choose GammaRidge?</p>
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
        </ul>
      </div>
      {/* <div className="flex w-1/2">
        <img
          className="w-[500px] "
          src={cashInHand}
          alt="handing cash to client"
        />
      </div> */}
    </div>
  );
}

export default Home;
