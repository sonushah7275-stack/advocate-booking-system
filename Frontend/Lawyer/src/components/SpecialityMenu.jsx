import React from "react";
import { useNavigate } from "react-router-dom";

const SpecialityMenu = () => {
  const navigate = useNavigate();

  const specialities = [
    {
      name: "Criminal Law",
      icon: "⚖️",
      lawyers: 120,
      color: "from-yellow-400 to-yellow-600",
    },
    {
      name: "Family Law",
      icon: "👨‍👩‍👧",
      lawyers: 85,
      color: "from-pink-400 to-red-500",
    },
    {
      name: "Corporate Law",
      icon: "🏢",
      lawyers: 64,
      color: "from-blue-400 to-blue-600",
    },
    {
      name: "Property Law",
      icon: "🏠",
      lawyers: 72,
      color: "from-green-400 to-green-600",
    },
    {
      name: "Cyber Law",
      icon: "💻",
      lawyers: 40,
      color: "from-purple-400 to-purple-600",
    },
    {
      name: "Divorce Law",
      icon: "📄",
      lawyers: 55,
      color: "from-orange-400 to-orange-600",
    },
  ];

  return (
    <section className="py-20">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold">
          Legal Services by Speciality
        </h2>

        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Connect with experienced advocates based on their area of expertise.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {specialities.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/advocate/${item.name}`)}
            className="group cursor-pointer relative p-6 rounded-xl shadow-md hover:shadow-2xl transition duration-300 bg-white overflow-hidden"
          >
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br ${item.color}`}
            ></div>

            <div className="relative z-10 text-center group-hover:text-white transition">
              <div className="text-4xl mb-3">{item.icon}</div>

              <h3 className="font-semibold text-lg">{item.name}</h3>

              <p className="text-sm text-gray-500 group-hover:text-white mt-1">
                {item.lawyers}+ Lawyers
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialityMenu;
