import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-12 ">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p className="">
            Connecting clients with experienced advocates across multiple legal
            specializations. Your trusted platform for reliable legal
            assistance.
          </p>
          <p className="">
            Our platform helps individuals and businesses connect with trusted
            legal professionals. Whether you need assistance in criminal,
            corporate, family, or property law, we make finding the right
            advocate simple and efficient.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p className="">
            We aim to simplify the legal consultation process by allowing users
            to browse advocates, review expertise, and book appointments online.
          </p>
        </div>
      </div>
      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-amber-200 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efficiency:</b>
          <p>
            This platform made it extremely easy to find a trusted lawyer. The
            appointment process was smooth and professional.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-amber-200 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convenience:</b>
          <p>
            I was able to consult an experienced family lawyer quickly. Highly
            recommended for anyone needing legal help.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-amber-200 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalization:</b>
          <p>
            A reliable platform with verified advocates. The booking system is
            simple and very convenient.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

// import React from "react";

// const About = () => {
//   const team = [
//     {
//       name: "Rajesh Sharma",
//       speciality: "Criminal Lawyer",
//       image:
//         "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=500",
//     },
//     {
//       name: "Priya Verma",
//       speciality: "Family Lawyer",
//       image:
//         "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500",
//     },
//     {
//       name: "Amit Singh",
//       speciality: "Corporate Lawyer",
//       image:
//         "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=500",
//     },
//   ];

//   const testimonials = [
//     {
//       name: "Rohan Mehta",
//       text: "This platform made it extremely easy to find a trusted lawyer. The appointment process was smooth and professional.",
//     },
//     {
//       name: "Sneha Kapoor",
//       text: "I was able to consult an experienced family lawyer quickly. Highly recommended for anyone needing legal help.",
//     },
//     {
//       name: "Arjun Patel",
//       text: "A reliable platform with verified advocates. The booking system is simple and very convenient.",
//     },
//   ];

//   return (
//     <div className="w-full">

//       {/* HERO SECTION */}
//       <section className="bg-gray-900 text-white py-20 text-center">
//         <h1 className="text-4xl md:text-5xl font-bold mb-4">
//           Trusted Legal Experts
//         </h1>
//         <p className="max-w-2xl mx-auto text-gray-300">
//           Connecting clients with experienced advocates across multiple legal
//           specializations. Your trusted platform for reliable legal assistance.
//         </p>
//       </section>

//       {/* ABOUT SECTION */}
//       <section className="py-16 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

//         <img
//           src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f"
//           alt="law"
//           className="rounded-xl shadow-lg"
//         />

//         <div>
//           <h2 className="text-3xl font-bold mb-4">
//             Who We Are
//           </h2>

//           <p className="text-gray-600 mb-4">
//             Our platform helps individuals and businesses connect with trusted
//             legal professionals. Whether you need assistance in criminal,
//             corporate, family, or property law, we make finding the right
//             advocate simple and efficient.
//           </p>

//           <p className="text-gray-600">
//             We aim to simplify the legal consultation process by allowing
//             users to browse advocates, review expertise, and book appointments
//             online.
//           </p>
//         </div>

//       </section>

//       {/* TEAM SECTION */}
//       <section className="bg-gray-100 py-16">

//         <h2 className="text-3xl font-bold text-center mb-12">
//           Our Legal Experts
//         </h2>

//         <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">

//           {team.map((lawyer, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow hover:shadow-xl transition p-6 text-center"
//             >
//               <img
//                 src={lawyer.image}
//                 alt={lawyer.name}
//                 className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
//               />

//               <h3 className="text-xl font-semibold">
//                 {lawyer.name}
//               </h3>

//               <p className="text-gray-500">
//                 {lawyer.speciality}
//               </p>
//             </div>
//           ))}

//         </div>

//       </section>

//       {/* TESTIMONIAL SECTION */}
//       <section className="py-16 max-w-6xl mx-auto px-6">

//         <h2 className="text-3xl font-bold text-center mb-12">
//           What Our Clients Say
//         </h2>

//         <div className="grid md:grid-cols-3 gap-8">

//           {testimonials.map((item, index) => (
//             <div
//               key={index}
//               className="border rounded-xl p-6 hover:shadow-lg transition"
//             >
//               <p className="text-gray-600 mb-4">
//                 "{item.text}"
//               </p>

//               <h4 className="font-semibold">
//                 {item.name}
//               </h4>
//             </div>
//           ))}

//         </div>

//       </section>

//     </div>
//   );
// };

// export default About;
