import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Advocate = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);

  const { advocates } = useContext(AppContext);

  // ✅ Categories SAME as data
  const categories = [
    "Criminal Law",
    "Family Law",
    "Corporate Law",
    "Property Law",
    "Cyber Law",
    "Divorce Law",
  ];

  // ✅ Direct filter
  const filterAdvo = speciality
    ? advocates.filter((advo) => advo.speciality === speciality)
    : advocates;

  return (
    <div>
      <p className="text-gray-600 text-lg">
        Browse through the advocates specialists
      </p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-amber-200 text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>

        {/* Sidebar */}
        <div
          className={` flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex" : "hidden sm:flex"}`}
        >
          {categories.map((cat) => (
            <p
              key={cat}
              onClick={() =>
                speciality === cat
                  ? navigate("/advocate")
                  : navigate(`/advocate/${cat}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === cat ? "bg-indigo-100 text-black" : ""
              }`}
            >
              {cat}
            </p>
          ))}
        </div>

        {/* Grid */}
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 gap-y-6">
          {filterAdvo.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-auto sm:h-48 object-contain sm:object-cover bg-gray-100"
              />

              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm ${
                    item?.available ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item?.available ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></span>

                  <span>{item?.available ? "Available" : "Not Available"}</span>
                </div>

                <p className="text-gray-900 text-lg font-medium mt-1">
                  {item.name}
                </p>

                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Advocate;
