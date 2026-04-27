import advocateModel from "../models/advocateModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailablity = async (req, res) => {
  try {
    const { advoId } = req.body;

    const advoData = await advocateModel.findById(advoId);
    await advocateModel.findByIdAndUpdate(advoId, {
      available: !advoData.available,
    });
    res.json({ success: true, message: "Availablity Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const advocateList = async (req, res) => {
  try {
    const advocate = await advocateModel
      .find({})
      .select(["-password", "-email"]);
    res.json({ success: true, advocate });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API for advocate Login
const loginAdvocate = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  Find advocate
    const advocate = await advocateModel.findOne({ email });
    if (!advocate) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    // Compare password
    const isMatch = await bcrypt.compare(password, advocate.password);

    if (isMatch) {
      const token = jwt.sign({ id: advocate._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get advocate appointments for advocate panel
const appointmentsAdvocate = async (req, res) => {
  try {
    const advoId = req.advoId;

    if (!advoId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Advocate ID missing",
      });
    }

    const appointments = await appointmentModel.find({ advoId });

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to mark appointment completed for advocate panel
const appointmentComplete = async (req, res) => {
  try {
    const advoId = req.advoId; // ✅ from middleware
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.advoId === advoId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });

      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      return res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API to cancel appointment for advocate panel
const appointmentCancel = async (req, res) => {
  try {
    const advoId = req.advoId; // ✅ from middleware
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.advoId === advoId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true, // ✅ FIXED (lowercase)
      });

      return res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      return res.json({ success: false, message: "Cancellation Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get dashboard data for advocate panel
const advocateDashboard = async (req, res) => {
  try {
    const advoId = req.advoId; // ✅ from middleware

    const appointments = await appointmentModel.find({ advoId });

    let earnings = 0;

    appointments.forEach((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];

    appointments.forEach((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.slice().reverse().slice(0, 5), // ✅ safe reverse
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// API to get advocate profile for Advocate Panel
const advocateProfile = async (req, res) => {
  try {
    const advoId = req.advoId;
    const profileData = await advocateModel
      .findById(advoId)
      .select("-password");
    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to update advocate profile data from Advocate Panel
const updateAdvocateProfile = async (req, res) => {
  try {
    const advoId = req.advoId;
    const { fees, address, available } = req.body;
    await advocateModel.findByIdAndUpdate(advoId, { fees, address, available });
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailablity,
  advocateList,
  loginAdvocate,
  appointmentsAdvocate,
  appointmentComplete,
  appointmentCancel,
  advocateDashboard,
  advocateProfile,
  updateAdvocateProfile,
};
