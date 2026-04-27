import express from "express";
import {
  advocateDashboard,
  advocateList,
  advocateProfile,
  appointmentCancel,
  appointmentComplete,
  appointmentsAdvocate,
  loginAdvocate,
  updateAdvocateProfile,
} from "../controllers/advocateController.js";
import authAdvocate from "../middlewares/authAdvocate.js";

const advocateRouter = express.Router();

// ✅ GET all advocates
advocateRouter.get("/list", advocateList);
advocateRouter.post("/login", loginAdvocate);
advocateRouter.get("/appointments", authAdvocate, appointmentsAdvocate);
advocateRouter.post("/complete-appointment", authAdvocate, appointmentComplete);
advocateRouter.post("/cancel-appointment", authAdvocate, appointmentCancel);
advocateRouter.get("/dashboard", authAdvocate, advocateDashboard);
advocateRouter.get("/profile", authAdvocate, advocateProfile);
advocateRouter.post("/update-profile", authAdvocate, updateAdvocateProfile);

export default advocateRouter;
