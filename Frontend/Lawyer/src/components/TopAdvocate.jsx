import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopAdvocate = () => {
  const navigate = useNavigate();
  const { advocates } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      {/* Heading */}
      <h1 className="text-3xl font-medium">Top Rated Advocates</h1>

      <p className="sm:w-1/3 text-center text-sm text-gray-600">
        Connect with experienced lawyers across multiple legal fields
      </p>

      {/* Grid */}
      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6 pt-5 px-3 sm:px-0">
        {advocates.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-auto sm:h-48 object-contain sm:object-cover bg-gray-100"
            />

            {/* Content */}
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

      {/* Button */}
      <button
        onClick={() => {
          navigate("/advocate");
          scrollTo(0, 0);
        }}
        className="bg-yellow-100 hover:bg-yellow-200 text-gray-700 px-12 py-3 rounded-full mt-10 transition"
      >
        View More
      </button>
    </div>
  );
};

export default TopAdvocate;

// import React, { useContext } from "react";
// import { AppContext } from "../context/AppContext";

// const TopAdvocate = () => {
//   const { advocates } = useContext(AppContext);

//   return (
//     <div className="px-6 md:px-12 py-10">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">
//         Top Advocates
//       </h2>

//       {/* Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

//         {(advocates || []).slice(0, 8).map((item, index) => (

//           <div
//             key={index}
//             className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 cursor-pointer"
//           >
//             {/* Image */}
//             <div className="flex justify-center">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-24 h-24 object-cover rounded-full border"
//               />
//             </div>

//             {/* Name */}
//             <h3 className="text-lg font-semibold text-center mt-3">
//               {item.name}
//             </h3>

//             {/* Speciality */}
//             <p className="text-sm text-gray-500 text-center">
//               {item.speciality}
//             </p>

//             {/* Experience */}
//             <p className="text-sm text-gray-600 text-center mt-1">
//               {item.experience} Years Experience
//             </p>

//             {/* Fees */}
//             <p className="text-center text-blue-600 font-semibold mt-2">
//               ₹{item.fees}
//             </p>

//             {/* Availability */}
//             <div className="flex justify-center mt-2">
//               <span
//                 className={`px-2 py-1 text-xs rounded-full ${
//                   item.available
//                     ? "bg-green-100 text-green-600"
//                     : "bg-red-100 text-red-500"
//                 }`}
//               >
//                 {item.available ? "Available" : "Not Available"}
//               </span>
//             </div>

//             {/* Button */}
//             <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
//               Book Appointment
//             </button>
//           </div>
//         ))}

//       </div>
//     </div>
//   );
// };

// export default TopAdvocate;
