import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedAdvocates = ({ speciality, advoId }) => {
  const { advocates } = useContext(AppContext);
  const navigate = useNavigate();

  const [relAdvo, setRelAdvo] = useState([]);
  useEffect(() => {
    if (advocates.length > 0 && speciality) {
      const advocatesData = advocates.filter(
        (advo) => advo.speciality === speciality && advo._id !== advoId,
      );
      setRelAdvo(advocatesData);
    }
  }, [advocates, speciality, advoId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      {/* Heading */}
      <h1 className="text-3xl font-medium">Top Related Advocates</h1>

      <p className="sm:w-1/3 text-center text-sm text-gray-600">
        Connect with experienced lawyers across multiple legal fields
      </p>

      {/* Grid */}
      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6 pt-5 px-3 sm:px-0">
        {relAdvo.slice(0, 5).map((item, index) => (
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

export default RelatedAdvocates;

// import React, { useContext } from "react";
// import { AppContext } from "../context/AppContext";
// import { Link } from "react-router-dom";

// const RelatedAdvocates = ({ speciality, advoId }) => {
//   const { advocates } = useContext(AppContext);

//   const related = advocates.filter(
//     (adv) => adv.speciality === speciality && adv._id !== advoId,
//   );

//   return (
//     <div className="mt-16">
//       <h2 className="text-2xl font-semibold mb-6">Related Advocates</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {related.map((item) => (
//           <Link
//             key={item._id}
//             to={`/appointment/${item._id}`}
//             className="border rounded-xl p-4 hover:shadow-md"
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-full h-48 object-cover rounded-lg"
//             />

//             <h3 className="mt-3 font-semibold">{item.name}</h3>

//             <p className="text-gray-500 text-sm">{item.speciality}</p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RelatedAdvocates;
