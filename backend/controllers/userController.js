import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import advocateModel from "../models/advocateModel.js";
import appointmentModel from "../models/appointmentModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// ================= REGISTER USER =================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Weak Password" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= LOGIN USER =================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= USER PROFILE =================
const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");
    res.json({ success: true, userData: user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= UPDATE USER PROFILE =================
const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Missing Data" });
    }

    let parsedAddress;
    try {
      parsedAddress =
        typeof address === "string" ? JSON.parse(address) : address;
    } catch {
      parsedAddress = address;
    }

    await userModel.findByIdAndUpdate(req.userId, {
      name,
      phone,
      address: parsedAddress,
      dob,
      gender,
    });

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path);
      await userModel.findByIdAndUpdate(req.userId, {
        image: upload.secure_url,
      });
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= BOOK APPOINTMENT =================
const bookAppointment = async (req, res) => {
  try {
    const { advoId, slotDate, slotTime } = req.body;
    const userId = req.userId;
    // console.log("Booking advoId", advoId);
    const advo = await advocateModel.findById(advoId); 

    if (!advo || !advo.available) {
      return res.json({ success: false, message: "Advocate not available" });
    }

    let slots = advo.slots_booked || {}; 

    if (slots[slotDate]?.includes(slotTime)) {
      return res.json({ success: false, message: "Slot not available" });
    }

    slots[slotDate] = [...(slots[slotDate] || []), slotTime];

    const user = await userModel.findById(userId).select("-password");

    const advoObj = advo.toObject();
    delete advoObj.slots_booked;

    const appointment = await new appointmentModel({
      userId,
      advoId,
      userData: user,
      advoData: advoObj,
      amount: advo.fees,
      slotDate,
      slotTime,
      date: Date.now(),
    }).save();

    await advocateModel.findByIdAndUpdate(advoId, { slots_booked: slots });

    res.json({ success: true, message: "Appointment Booked", appointment });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= LIST APPOINTMENTS =================
const listAppointment = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({ userId: req.userId });
    res.json({ success: true, appointments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= CANCEL APPOINTMENT =================
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.userId;

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.json({ success: false, message: "Not found" });
    }

    // 🔐 SECURITY CHECK
    if (appointment.userId.toString() !== userId) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const advo = await advocateModel.findById(appointment.advoId);

    if (advo.slots_booked[appointment.slotDate]) {
      advo.slots_booked[appointment.slotDate] = advo.slots_booked[
        appointment.slotDate
      ].filter((t) => t !== appointment.slotTime);
    }

    await advocateModel.findByIdAndUpdate(advo._id, {
      slots_booked: advo.slots_booked,
    });

    res.json({ success: true, message: "Cancelled" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= RAZORPAY =================
const razorpay = new Razorpay({
  key_id: "rzp_test_ScHAp8ZQtYCIw0",
  key_secret: "eUk9oL2TA8lw2IrEpTCtFaqT",
});

// ================= CREATE ORDER =================
const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment || appointment.cancelled) {
      return res.json({ success: false, message: "Invalid appointment" });
    }

    if (appointment.payment) {
      return res.json({ success: false, message: "Already paid" });
    }

    const order = await razorpay.orders.create({
      amount: appointment.amount * 100,
      currency: "INR",
      receipt: appointmentId,
    });

    res.json({ success: true, order });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= VERIFY PAYMENT =================
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      appointmentId,
    } = req.body;

    // ✅ check required fields
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !appointmentId
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    // ✅ create expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    // ✅ verify signature
    if (expectedSignature === razorpay_signature) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        payment: true,
      });

      return res.json({
        success: true,
        message: "Payment Verified Successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Signature",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= EXPORT =================
export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyPayment,
};
