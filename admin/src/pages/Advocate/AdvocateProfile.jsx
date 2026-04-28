import React, { useContext, useEffect, useState } from "react";
import { AdvocateContext } from "../../context/AdvocateContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const AdvocateProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(AdvocateContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };
      const { data } = await axios.post(
        backendUrl + "/api/advocate/update-profile",
        updateData,
        { headers: { dtoken: dToken } },
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);
  return (
    return (
  <div>
    {!profileData ? (
      <p className="text-center mt-10 text-gray-500">Loading profile...</p>
    ) : (
      <div className="flex flex-col gap-4 m-5">
        
        {/* Image */}
        <div>
          <img
            className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
            src={profileData?.image || "/default.png"}
            alt="profile"
          />
        </div>

        {/* Info */}
        <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
          
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {profileData?.name || "No Name"}
          </p>

          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>
              {profileData?.degree} - {profileData?.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {profileData?.experience}
            </button>
          </div>

          {/* About */}
          <div>
            <p className="text-sm font-medium mt-3">About:</p>
            <p className="text-sm text-gray-600 mt-1">
              {profileData?.about}
            </p>
          </div>

          {/* Fees */}
          <p className="text-gray-600 font-medium mt-4">
            Appointment fee:{" "}
            <span className="text-gray-800">
              {currency}{" "}
              {isEdit ? (
                <input
                  type="number"
                  value={profileData?.fees || ""}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                />
              ) : (
                profileData?.fees
              )}
            </span>
          </p>

          {/* Address */}
          <div className="flex gap-2 py-2">
            <p>Address:</p>
            <p className="text-sm">
              {isEdit ? (
                <input
                  type="text"
                  value={profileData?.address?.line1 || ""}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
              ) : (
                profileData?.address?.line1
              )}
              <br />
              {isEdit ? (
                <input
                  type="text"
                  value={profileData?.address?.line2 || ""}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              ) : (
                profileData?.address?.line2
              )}
            </p>
          </div>

          {/* Available */}
          <div className="flex gap-1 pt-2">
            <input
              id="available"
              type="checkbox"
              checked={profileData?.available || false}
              onChange={() =>
                isEdit &&
                setProfileData((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
            />
            <label htmlFor="available">Available</label>
          </div>

          {/* Buttons */}
          {isEdit ? (
            <button
              onClick={updateProfile}
              className="px-4 py-1 border border-primary rounded-full mt-5"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-1 border border-primary rounded-full mt-5"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )}
  </div>
);
  );
};

export default AdvocateProfile;
