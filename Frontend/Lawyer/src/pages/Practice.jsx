import React from "react";

const Practice = () => {
  const practiceAreas = [
    {
      title: "Criminal Law",
      description:
        "Defense and legal representation for criminal cases including theft, fraud, assault, and other criminal matters.",
      icon: "⚖️",
    },
    {
      title: "Family Law",
      description:
        "Legal assistance for family matters such as divorce, child custody, adoption, and domestic disputes.",
      icon: "👨‍👩‍👧",
    },
    {
      title: "Corporate Law",
      description:
        "Legal guidance for businesses including company formation, contracts, mergers, and compliance.",
      icon: "🏢",
    },
    {
      title: "Property Law",
      description:
        "Handling property disputes, land documentation, real estate transactions, and ownership issues.",
      icon: "🏠",
    },
    {
      title: "Cyber Law",
      description:
        "Legal solutions for cyber crimes, online fraud, data protection, and digital security matters.",
      icon: "💻",
    },
    {
      title: "Divorce Law",
      description:
        "Professional legal support for divorce proceedings, alimony, and settlement negotiations.",
      icon: "📄",
    },
  ];

  return (
    <div className="py-12">
      {/* HERO SECTION */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Our Practice Areas
        </h1>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          We offer expert legal services across multiple practice areas to
          ensure you receive the best possible legal representation.
        </p>
      </div>

      {/* PRACTICE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {practiceAreas.map((area, index) => (
          <div
            key={index}
            className="border rounded-xl p-6 hover:shadow-xl hover:-translate-y-2 transition duration-300 bg-white"
          >
            {/* Icon */}
            <div className="text-4xl mb-4">{area.icon}</div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {area.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm">{area.description}</p>
          </div>
        ))}
      </div>

      {/* CTA SECTION */}
      <div className="mt-16 text-center bg-yellow-500 text-white p-10 rounded-xl">
        <h2 className="text-2xl font-bold mb-3">Need Legal Assistance?</h2>
        <p className="mb-5">
          Connect with experienced advocates and get professional legal
          consultation today.
        </p>

        <a
          href="/advocate"
          className="bg-white text-yellow-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Find a Lawyer
        </a>
      </div>
    </div>
  );
};

export default Practice;
