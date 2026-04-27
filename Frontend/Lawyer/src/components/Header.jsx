import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-gray-50 rounded-xl px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="md:w-1/2 space-y-6"
      >
        <h1 className="text-5xl font-bold text-gray-800 leading-tight">
          Trusted Legal Solutions <br />
          for Your Case
        </h1>

        <p className="text-gray-600 text-lg">
          Connect with professional advocates for expert legal advice, case
          consultation, and representation.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/advocate")}
            className="cursor-pointer bg-yellow-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-yellow-600"
          >
            Find Advocate
          </button>

          <button
            onClick={() => navigate("/contact")}
            className=" cursor-pointer border px-6 py-3 rounded-full hover:bg-gray-100"
          >
            Free Consultation
          </button>
        </div>
      </motion.div>

      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <img
          className="rounded-xl shadow-lg w-[450px]"
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f"
        />
      </div>
    </section>
  );
};

export default Header;
