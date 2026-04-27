import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
const MyProfile = () => {
  const { userData, setUserData, token, backendURL, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);
      const { data } = await axios.post(
        backendURL + "/api/user/update-profile",
        formData,
        {
          headers: {
            token: token,
          },
        },
      );
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="bg-white shadow-lg rounded-xl p-5 sm:p-8">
          {/* Profile Top */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {isEdit ? (
              <label htmlFor="image">
                <div className="inline-block relative cursor-pointer">
                  <img
                    className="w-36 rounded opacity-75"
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt=""
                  />
                  <img
                    className="w-10 absolute bottom-12 right-12"
                    src={image ? null : assets.upload_icon}
                  />
                </div>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
            ) : (
              <img
                src={userData.image}
                alt=""
                className="w-32 h-32 rounded-full object-cover border"
              />
            )}

            <div className="text-center sm:text-left w-full">
              {isEdit ? (
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="border p-2 rounded w-full"
                />
              ) : (
                <p className="text-2xl font-semibold">{userData.name}</p>
              )}

              <p className="text-gray-500">{userData.email}</p>
            </div>
          </div>

          <hr className="my-6" />

          {/* Contact Info */}
          <div>
            <p className="font-semibold text-lg mb-3">CONTACT INFORMATION</p>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Phone</p>
                {isEdit ? (
                  <input
                    type="text"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="border p-2 rounded w-full"
                  />
                ) : (
                  <p>{userData.phone}</p>
                )}
              </div>

              <div>
                <p className="text-gray-500">Address</p>
                {isEdit ? (
                  <>
                    <input
                      type="text"
                      value={userData.address.line1}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            line1: e.target.value,
                          },
                        }))
                      }
                      className="border p-2 rounded w-full mb-2"
                    />
                    <input
                      type="text"
                      value={userData.address.line2}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            line2: e.target.value,
                          },
                        }))
                      }
                      className="border p-2 rounded w-full"
                    />
                  </>
                ) : (
                  <p>
                    {userData.address.line1} <br />
                    {userData.address.line2}
                  </p>
                )}
              </div>
            </div>
          </div>

          <hr className="my-6" />

          {/* Basic Info */}
          <div>
            <p className="font-semibold text-lg mb-3">BASIC INFORMATION</p>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Gender</p>
                {isEdit ? (
                  <select
                    value={userData.gender}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    className="border p-2 rounded w-full"
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                ) : (
                  <p>{userData.gender}</p>
                )}
              </div>

              <div>
                <p className="text-gray-500">Birthday</p>
                {isEdit ? (
                  <input
                    type="date"
                    value={userData.dob}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        dob: e.target.value,
                      }))
                    }
                    className="border p-2 rounded w-full"
                  />
                ) : (
                  <p>{userData.dob}</p>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end">
            {isEdit ? (
              <button
                onClick={updateUserProfileData}
                className="bg-indigo-500 text-white px-6 py-2 rounded"
              >
                Save Information
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="bg-indigo-500 text-white px-6 py-2 rounded"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
