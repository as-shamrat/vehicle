import express from "express";
import { bookingControllers } from "./booking.controllers";
import auth from "../../middleware/auth";
const router = express.Router();
router.get("/", auth("admin", "customer"), bookingControllers.getBookings);
router.post("/", auth("admin", "customer"), bookingControllers.createBooking);
router.put(
  "/:bookingId",
  auth("admin", "customer"),
  bookingControllers.updateBooking
);
export default router;
