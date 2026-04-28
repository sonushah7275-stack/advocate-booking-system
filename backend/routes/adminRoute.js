import express from "express";
import {
  addAdvocate,
  allAdvocate,
  loginAdmin,
  appointmentsAdmin,
  adminCancelAppointment,
  adminDashboard,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailablity } from "../controllers/advocateController.js";

const adminRouter = express.Router();

adminRouter.post(
  "/add-advocate",
  authAdmin,
  upload.single("image"),
  addAdvocate,
);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-advocate", authAdmin, allAdvocate);
adminRouter.post("/change-availablity", authAdmin, changeAvailablity);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, adminCancelAppointment);
adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;
