import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-yellow-50 to-white py-16">
      <div className="grid md:grid-cols-2 items-center gap-10">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Find the Best <span className="text-yellow-500">Advocates</span>{" "}
            <br />
            for Your Legal Needs
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Connect with experienced lawyers across multiple legal fields. Book
            appointments, get legal advice, and resolve your legal matters
            quickly and securely.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={() => navigate("/advocate")}
              className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
            >
              Find Advocates
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="border border-gray-400 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Free Consultation
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10 text-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">500+</h3>
              <p className="text-gray-500 text-sm">Experienced Lawyers</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800">1200+</h3>
              <p className="text-gray-500 text-sm">Happy Clients</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800">98%</h3>
              <p className="text-gray-500 text-sm">Success Rate</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800"
            alt="lawyer"
            className="rounded-xl shadow-xl w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
