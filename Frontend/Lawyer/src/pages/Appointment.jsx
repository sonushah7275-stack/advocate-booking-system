import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedAdvocates from "../components/RelatedAdvocates";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { advoId } = useParams();
  const { advocates, currencySymbol, backendURL, token, getAdvocateData } =
    useContext(AppContext);

  const daysofWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();

  const [advoInfo, setAdvoInfo] = useState(null);
  const [advoSlots, setAdvoSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // ✅ Fetch Advocate Info
  const fetchAdvoInfo = () => {
    const data = advocates.find((advo) => advo._id === advoId);
    setAdvoInfo(data);
  };

  // ✅ Generate Slots
  const getAvailableSlots = () => {
    setAdvoSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10,
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable = advoInfo?.slots_booked?.[slotDate]?.includes(
          slotTime,
        )
          ? false
          : true;

        if (isSlotAvailable) {
          // add slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setAdvoSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }
    if (!advoSlots[slotIndex] || advoSlots[slotIndex].length === 0) {
      return toast.error("No slots available");
    }

    try {
      const date = advoSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendURL + "/api/user/book-appointment",
        { advoId, slotDate, slotTime },
        { headers: { token } },
      );
      if (data.success) {
        toast.success(data.message);
        getAdvocateData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ✅ Effects
  useEffect(() => {
    fetchAdvoInfo();
  }, [advocates, advoId]);

  useEffect(() => {
    if (advoInfo) getAvailableSlots();
  }, [advoInfo]);

  return (
    advoInfo && (
      <div>
        {/* Advocate Details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-amber-100 w-full sm:max-w-72 rounded-lg"
              src={advoInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {advoInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>

            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {advoInfo.degree} - {advoInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {advoInfo.experience}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {advoInfo.about}
              </p>
            </div>

            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {advoInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>

          {/* Days */}
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {advoSlots.length > 0 &&
              advoSlots.map((item, index) => (
                <div
                  key={item[0]?.datetime?.getTime() || index}
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-amber-200 text-white"
                      : "border border-gray-200"
                  }`}
                >
                  <p>{item[0] ? daysofWeek[item[0].datetime.getDay()] : ""}</p>
                  <p>{item[0] ? item[0].datetime.getDate() : ""}</p>
                </div>
              ))}
          </div>

          {/* Time Slots */}
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {advoSlots.length > 0 &&
              advoSlots[slotIndex]?.map((item, index) => (
                <p
                  key={item.time}
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-amber-200 text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          <button
            onClick={bookAppointment}
            className="bg-amber-200 text-black text-sm font-light px-14 py-3 rounded-full my-6"
          >
            Book an appointment
          </button>
        </div>

        {/* Related Advocates */}
        <RelatedAdvocates advoId={advoId} speciality={advoInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
