import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddAdvocate = () => {
  const [advoImg, setAdvoImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("Criminal Law");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!advoImg) {
        return toast.error("Image Not Selected");
      }

      const formData = new FormData();

      formData.append("image", advoImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 }),
      );

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-advocate",
        formData,
        { headers: { atoken: aToken } },
      );

      if (data.success) {
        toast.success(data.message);
        setAdvoImg(false);
        setName("");
        setPassword("");
        setEmail("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setAbout("");
        setFees("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Advocate</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="advo-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={advoImg ? URL.createObjectURL(advoImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setAdvoImg(e.target.files[0])}
            type="file"
            id="advo-img"
            hidden
          />
          <p>Upload advocate picture</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 text-gray-600">
          <div className="flex-1 flex flex-col gap-3">
            <p>Advocate Name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded"
              placeholder="Name"
              required
            />

            <div>
              <p>Advocate Email</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <p>Advocate Password</p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 rounded"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div>
              <p>Experience</p>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="border p-2 rounded"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}year
                  </option>
                ))}
              </select>
            </div>
            <p>Fees</p>
            <input
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              className="border p-2 rounded"
              type="number"
              placeholder="Fees"
              required
            />
          </div>

          <div className="flex-1 flex flex-col gap-3">
            <p>Speciality</p>
            <select
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              className="border p-2 rounded"
            >
              <option>Criminal Law</option>
              <option>Family Law</option>
              <option>Corporate Law</option>
              <option>Property Law</option>
              <option>Cyber Law</option>
              <option>Divorce Law</option>
            </select>
            <p>Education</p>
            <input
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="border p-2 rounded"
              placeholder="Education"
              required
            />
            <p>Address1</p>
            <input
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className="border p-2 rounded"
              placeholder="Address 1"
              required
            />
            <p>Address2</p>
            <input
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              className="border p-2 rounded"
              placeholder="Address 2"
              required
            />
          </div>
        </div>
        <p>About Advocate</p>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="w-full border p-2 rounded mt-4"
          rows={5}
          placeholder="About advocate"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 mt-4 rounded"
        >
          Add Advocate
        </button>
      </div>
    </form>
  );
};

export default AddAdvocate;
