import { motion } from "framer-motion";
import Footer from "../components/Footer";

const Services = () => {
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
            Our Services
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-xl mb-8"
          >
            Explore the wide range of services we offer to meet your needs.
          </motion.p>
        </div>
      </div>

      {/* Services Overview Section */}
      <div className="w-full bg-white py-16">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
          What We Offer
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
              Quick and easy loans to meet your financial needs. We offer
              flexible repayment plans and competitive interest rates.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">
              Learn More
            </button>
          </motion.div>

          {/* Clothing Card */}
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
                backgroundImage: `url('https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
              }}
            ></div>
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Clothing</h3>
            <p className="text-gray-700 mb-4">
              Stylish and affordable clothing for everyone. From casual wear to
              formal attire, we’ve got you covered.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">
              Learn More
            </button>
          </motion.div>

          {/* Farm Produce Card */}
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
                backgroundImage: `url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
              }}
            ></div>
            <h3 className="text-2xl font-bold text-blue-600 mb-4">
              Farm Produce
            </h3>
            <p className="text-gray-700 mb-4">
              Fresh and organic farm produce delivered to your doorstep. We
              source directly from local farmers to ensure quality.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">
              Learn More
            </button>
          </motion.div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-full bg-gray-100 py-16">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {/* Trust Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200"
          >
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Trust</h3>
            <p className="text-gray-700 mb-4">
              We have built a reputation for reliability and trustworthiness
              over the years.
            </p>
          </motion.div>

          {/* Quality Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200"
          >
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Quality</h3>
            <p className="text-gray-700 mb-4">
              We are committed to delivering high-quality products and services.
            </p>
          </motion.div>

          {/* Support Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200"
          >
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Support</h3>
            <p className="text-gray-700 mb-4">
              Our dedicated support team is always here to assist you.
            </p>
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

export default Services;
