import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);

  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        {/* Cards */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border hover:scale-105 transition">
            <img className="w-14" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.advocates || 0}
              </p>
              <p className="text-gray-400">Advocates</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border hover:scale-105 transition">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments || 0}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border hover:scale-105 transition">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients || 0}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings */}
        <div className="bg-white mt-6">
          <div className="flex items-center gap-2 px-4 py-4 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>

          <div className="pt-4 border border-t-0">
            {!dashData.latestAppointments ||
            dashData.latestAppointments.length === 0 ? (
              <p className="text-gray-500 px-4 py-3">No recent appointments</p>
            ) : (
              dashData.latestAppointments.map((item) => (
                <div
                  key={item._id} // ✅ FIX
                  className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                >
                  <img
                    className="rounded-full w-10"
                    src={item?.advoData?.image || "/default.png"} // ✅ FIX
                    alt=""
                  />

                  <div className="flex-1 text-sm">
                    <p className="text-gray-800">
                      {item?.advoData?.name || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      {slotDateFormat(item.slotDate)}
                    </p>
                  </div>

                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">
                      Cancelled
                    </p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium">
                      Completed
                    </p>
                  ) : (
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      src={assets.cancel_icon}
                      alt="cancel"
                      className="w-8 cursor-pointer hover:scale-110 transition"
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
