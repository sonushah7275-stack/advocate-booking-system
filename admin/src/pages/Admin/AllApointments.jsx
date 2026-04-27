import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets"; // ✅ import

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);

  const { calculateAge, slotDateFormat, currencySymbol } =
    useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        All Appointments
      </h2>

      {/* Table Header (Desktop only) */}
      <div className="hidden sm:grid grid-cols-7 bg-gray-100 p-3 rounded-lg text-sm font-semibold text-gray-600">
        <p>#</p>
        <p>Patient</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Advocate</p>
        <p>Fees</p>
        <p className="text-center">Actions</p>
      </div>

      {/* Data */}
      <div className="flex flex-col gap-4 mt-4">
        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments found.</p>
        ) : (
          appointments.map((item, index) => (
            <div
              key={item._id}
              className="grid grid-cols-1 sm:grid-cols-7 gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition bg-white"
            >
              {/* Index */}
              <p className="font-medium text-gray-600">{index + 1}</p>

              {/* Patient */}
              <div className="flex items-center gap-3">
                <img
                  src={item?.userData?.image || "/default.png"}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover bg-gray-100"
                />
                <p className="text-gray-800 font-medium">
                  {item?.userData?.name}
                </p>
              </div>

              {/* Age */}
              <p className="text-gray-600">
                {item?.userData?.dob ? calculateAge(item.userData.dob) : "N/A"}
              </p>

              {/* Date & Time */}
              <div className="text-gray-600 text-sm">
                <p>{slotDateFormat(item.slotDate)}</p>
                <p>{item.slotTime}</p>
              </div>

              {/* Advocate */}
              <div className="flex items-center gap-3">
                <img
                  src={item?.advoData?.image}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover bg-gray-100"
                />
                <p className="text-gray-800 font-medium">
                  {item?.advoData?.name}
                </p>
              </div>

              {/* Fees */}
              <p className="text-gray-700 font-semibold">
                {currencySymbol}
                {item.amount}
              </p>

              {/* Actions */}
              <div className="flex justify-center items-center gap-2">
                {item.cancelled ? (
                  <span className="text-red-500 text-sm font-medium">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="text-green-500 text-sm font-medium">
                    Completed
                  </span>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    src={assets.cancel_icon}
                    alt="cancel"
                    className="w-8 cursor-pointer hover:scale-110 transition"
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
