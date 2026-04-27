import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const {
    backendURL,
    token,
    getAdvocateData,
    slotDateFormat, // ✅ FIXED
  } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments([...data.appointments].reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendURL + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } },
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getAdvocateData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ OPEN RAZORPAY
  const initPay = (order, appointmentId) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Advocate Booking",
      description: "Appointment Payment",
      order_id: order.id,

      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendURL + "/api/user/verify-razorpay",
            {
              ...response,
              appointmentId,
            },
            { headers: { token } },
          );

          if (data.success) {
            toast.success("Payment Successful");
            getUserAppointments();
            navigate("/my-appointments");
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error("Payment verification failed");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  // ✅ FIXED API CALL
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendURL + "/api/user/payment-razorpay",
        { appointmentId }, // ✅ FIXED
        { headers: { token } },
      );

      if (data.success) {
        initPay(data.order, appointmentId);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-semibold mb-6">My Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {appointments.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row gap-5 bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
            >
              {/* Image */}
              <img
                src={item?.advoData?.image || "/default.png"}
                alt={item?.advoData?.name}
                className="w-full sm:w-32 h-auto sm:h-32 object-cover rounded-lg bg-gray-100"
              />

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {item?.advoData?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item?.advoData?.speciality}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item?.advoData?.address?.line1}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item?.advoData?.address?.line2}
                  </p>

                  <div className="text-sm text-gray-600 mt-2 space-y-1">
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {slotDateFormat(item.slotDate)}
                    </p>
                    <p>
                      <span className="font-medium">Time:</span> {item.slotTime}
                    </p>
                    <p>
                      <span className="font-medium">Fees:</span> ₹{item.amount}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-3">
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      item.cancelled
                        ? "bg-red-100 text-red-600"
                        : item.isCompleted
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                    }`}
                  >
                    {item.cancelled
                      ? "Cancelled"
                      : item.isCompleted
                        ? "Completed"
                        : "Confirmed"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col gap-3 justify-between sm:justify-center">
                {!item.cancelled && !item.isCompleted && (
                  <>
                    {!item.cancelled && item.payment && !item.isCompleted && (
                      <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">
                        Paid
                      </button>
                    )}
                    {!item.cancelled && !item.payment && !item.isCompleted && (
                      <button
                        onClick={() => appointmentRazorpay(item._id)}
                        className="border px-4 py-2 rounded hover:bg-gray-100 text-sm"
                      >
                        Pay Online
                      </button>
                    )}

                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white text-sm"
                    >
                      Cancel appointment
                    </button>
                  </>
                )}

                {item.cancelled && !item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                    Appointment Cancelled
                  </button>
                )}

                {item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-blue-500 rounded text-blue-500">
                    Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
