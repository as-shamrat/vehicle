import { Request, Response } from "express";
import { bookingServices } from "./booking.services";

const createBooking = async (req: Request, res: Response) => {
  try {
    const response = await bookingServices.createBooking({
      ...req.body,
    });
    console.log("response: ", response);
    if (response === false) {
      return res.status(400).json({
        success: false,
        message: "Vehicle not available",
        data: null,
      });
    }
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      errors: error,
    });
  }
};
const getBookings = async (req: Request, res: Response) => {
  try {
    console.log(req.user.customer_id, req.user.role);
    const response = await bookingServices.getBookings(
      req.user.role,
      req.user.customer_id
    );
    res.status(200).json({
      success: true,
      message: "Your bookings retrieved successfully",
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      errors: error,
    });
  }
};
const updateBooking = async (req: Request, res: Response) => {
  try {
    const response = await bookingServices.updateBooking(
      req.body,
      req.params.bookingId as string,
      req.user.role
    );
    const message: string =
      req.user.role === "admim"
        ? "Booking marked as returned. Vehicle is now available"
        : "Booking cancelled successfully";
    res.status(200).json({
      status: true,
      message: message,
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      errors: error,
    });
  }
};

export const bookingControllers = { createBooking, getBookings, updateBooking };
