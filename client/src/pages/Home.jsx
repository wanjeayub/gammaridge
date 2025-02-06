import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center text-white"
    >
      {/* Hero Section */}
      <div
        className="w-full h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="text-center bg-black bg-opacity-50 p-8 rounded-lg">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-6xl font-bold mb-4"
          >
            Welcome to Gammaridge
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-xl mb-8"
          >
            Your One-Stop Solution for Finance, Transport, and More!
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="flex space-x-4 justify-center"
          >
            <Link
              to="/entregister"
              className="flex items-center bg-white text-blue-600 md:px-4 rounded-full font-semibold hover:bg-blue-100 transition-all"
            >
              Get a Loan
            </Link>
            <Link
              to="/enttransport"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Light Transport
            </Link>
            <Link
              to="/entgarbage"
              className="bg-transparent md:px-2 border-2 border-white text-white px-3 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Garbage Collection
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Services Section */}
      <div className="w-full bg-white py-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {/* Loans Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200"
          >
            <div
              className="h-48 bg-cover bg-center rounded-t-lg mb-4"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
              }}
            ></div>
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Loans</h3>
            <p className="text-gray-700 mb-4">
              Quick and easy loans to meet your financial needs.
            </p>
            <Link
              to="/register"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
            >
              Apply Now
            </Link>
          </motion.div>

          {/* Light Transport Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200"
          >
            <div
              className="h-48 bg-cover bg-center rounded-t-lg mb-4"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
              }}
            ></div>
            <h3 className="text-2xl font-bold text-blue-600 mb-4">
              Light Transport
            </h3>
            <p className="text-gray-700 mb-4">
              Reliable and affordable light transport services.
            </p>
            <Link
              to="/enttransport"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
            >
              Book Now
            </Link>
          </motion.div>

          {/* Garbage Collection Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200"
          >
            <div
              className="h-48 bg-cover bg-center rounded-t-lg mb-4"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
              }}
            ></div>
            <h3 className="text-2xl font-bold text-blue-600 mb-4">
              Garbage Collection
            </h3>
            <p className="text-gray-700 mb-4">
              Efficient and eco-friendly garbage collection services.
            </p>
            <Link
              to="/entgarbage"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
            >
              Schedule Now
            </Link>
          </motion.div>

          {/* Phone Market Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200"
          >
            <div
              className="h-48 bg-cover bg-center rounded-t-lg mb-4"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80')`,
              }}
            ></div>
            <h3 className="text-2xl font-bold text-blue-600 mb-4">
              Phone Market
            </h3>
            <p className="text-gray-700 mb-4">
              Explore the latest smartphones and accessories.
            </p>
            <Link
              to="/entphone-market"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </motion.div>
  );
};

export default Home;
