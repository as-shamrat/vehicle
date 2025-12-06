import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.services";

const insertVehicle = async (req: Request, res: Response) => {
  try {
    const response = await vehicleServices.insertVehicle(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: response.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      errors: error,
    });
  }
};
const getVehicles = async (req: Request, res: Response) => {
  try {
    const response = await vehicleServices.getVehicles();
    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: response.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      errors: error,
    });
  }
};
const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const response = await vehicleServices.getSingleVehicle(
      req.params.vehicleId as string
    );
    if (response.rowCount === 0) {
      res.status(400).json({
        success: false,
        message: "Vehicle not found",
        data: null,
      });
    } else
      res.status(200).json({
        success: true,
        message: "Vehicle retrieved successfully",
        data: response.rows[0],
      });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      errors: error,
    });
  }
};
const updateVehicle = async (req: Request, res: Response) => {
  console.log("req.body: ", req.body);
  try {
    const response = await vehicleServices.updateVehicle(
      req.params.vehicleId as string,
      {
        availability_status: req.body.availability_status,
        daily_rent_price: req.body.daily_rent_price,
      }
    );
    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: response.rows[0],
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message,
      errors: error,
    });
  }
};
const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const response = await vehicleServices.deleteVehicle(
      req.params.vehicleId as string
    );
    if (!response) {
      res.status(400).json({
        success: false,
        message: "Vehicle is in service.Couldn't be deleted",
      });
    }
    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      errors: error,
    });
  }
};

export const vehicleControllers = {
  insertVehicle,
  getVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
