import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllApointments from "./pages/Admin/AllApointments";
import AddAdvocate from "./pages/Admin/AddAdvocate";
import AdvocateList from "./pages/Admin/AdvocateList";
import { AdvocateContext } from "./context/AdvocateContext";
import AdvocateDashboard from "./pages/Advocate/AdvocateDashboard";
import AdvocateAppointments from "./pages/Advocate/AdvocateAppointments";
import AdvocateProfile from "./pages/Advocate/AdvocateProfile";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(AdvocateContext);

  return aToken || dToken ? (
    <div className="bg-[#F8F9FD">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Admin Route */}
          <Route path="/" element={<> </>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllApointments />} />
          <Route path="/add-advocate" element={<AddAdvocate />} />
          <Route path="/advocate-list" element={<AdvocateList />} />
          {/* Advocate Route */}
          <Route path="/advocate-dashboard" element={<AdvocateDashboard />} />
          <Route
            path="/advocate-appointments"
            element={<AdvocateAppointments />}
          />
          <Route path="/advocate-profile" element={<AdvocateProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
