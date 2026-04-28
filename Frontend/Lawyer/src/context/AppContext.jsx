import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const currencySymbol = "₹";

  const backendURL =
    import.meta.env.VITE_BACKEND_URL || "https://advocate-booking-system-backend.onrender.com";

  const [advocates, setAdvocates] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || false);
  const [userData, setUserData] = useState(false);

  // ✅ FORMAT DATE
  const slotDateFormat = (slotDate) => {
    if (!slotDate) return "N/A";

    const months = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dateArray = slotDate.split("_");

    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  // ✅ CALCULATE AGE
  const calculateAge = (dob) => {
    if (!dob) return "N/A";

    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();

    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const getAdvocateData = async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/advocate/list");

      if (data.success) {
        setAdvocates(data.advocates || data.advocate || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/user/get-profile", {
        headers: { token },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    advocates,
    getAdvocateData,
    currencySymbol,
    backendURL,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
    slotDateFormat, // ✅ ADDED
    calculateAge, // ✅ ADDED
  };

  useEffect(() => {
    getAdvocateData();
  }, []);

  useEffect(() => {
    if (token)
      loadUserProfileData(); //check
    else setUserData(false);
  }, [token]);
  // useEffect(() => {
  //   if (token) {
  //     loadUserProfileData();
  //   } else {
  //     setUserData(false);
  //   }
  // }[token] );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
