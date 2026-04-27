import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendURL, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendURL + "/api/user/register", {
          name,
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendURL + "/api/user/login", {
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler} 
      className="min-h-[80vh] flex items-center justify-center"
    >
      <div className="flex flex-col gap-4 p-8 min-w-[300px] sm:min-w-96 border rounded-xl shadow-md">
        {/* Title */}
        <p className="text-2xl font-semibold text-center">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book
          appointment
        </p>

        {/* Name (Only for Sign Up) */}
        {state === "Sign Up" && (
          <input
            type="text"
            placeholder="Your Name"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Your Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Button */}
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Toggle */}
        <p className="text-sm text-center">
          {state === "Sign Up"
            ? "Already have an account?"
            : "Don't have an account?"}
          <span
            onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
            className="text-indigo-500 cursor-pointer ml-1"
          >
            {state === "Sign Up" ? "Login here" : "Sign Up here"}
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
