import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">Our OFFICE</p>
          <p className="text-gray-500">
            54709 William Station <br /> Suite 350, Washington, USA
          </p>
          <p className="text-gray-500">
            Tel: (415) 555-0132 <br /> Email: rvg@gmail.com
          </p>
          <p className="font-semibold text-lg text-gray-600">
            Careers at ADVOCATE{" "}
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 ">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

// import React, { useState } from "react";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Message sent successfully!");
//     setFormData({ name: "", email: "", message: "" });
//   };

//   return (
//     <div className="py-12 px-6 max-w-6xl mx-auto">
//       {/* Heading */}
//       <div className="text-center mb-12">
//         <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
//         <p className="text-gray-500 mt-2">
//           Have questions or need legal assistance? Reach out to us.
//         </p>
//       </div>

//       <div className="grid md:grid-cols-2 gap-10">
//         {/* CONTACT INFO */}
//         <div className="space-y-6">
//           <div>
//             <h2 className="text-xl font-semibold mb-2">Office Address</h2>
//             <p className="text-gray-600">
//               123 Legal Street, Business District,
//               <br />
//               New Delhi, India
//             </p>
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold mb-2">Phone</h2>
//             <p className="text-gray-600">+91 9876543210</p>
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold mb-2">Email</h2>
//             <p className="text-gray-600">support@lawyerbooking.com</p>
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold mb-2">Working Hours</h2>
//             <p className="text-gray-600">
//               Monday - Saturday: 9:00 AM - 7:00 PM
//             </p>
//           </div>
//         </div>

//         {/* CONTACT FORM */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white shadow-lg rounded-xl p-8 space-y-4"
//         >
//           <div>
//             <label className="block text-sm mb-1">Your Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Your Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Message</label>
//             <textarea
//               name="message"
//               rows="4"
//               value={formData.message}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             ></textarea>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
//           >
//             Send Message
//           </button>
//         </form>
//       </div>

//       {/* MAP SECTION */}
//       <div className="mt-16">
//         <iframe
//           title="map"
//           src="https://www.google.com/maps?q=New+Delhi&output=embed"
//           className="w-full h-80 rounded-xl border"
//         ></iframe>
//       </div>
//     </div>
//   );
// };

// export default Contact;
