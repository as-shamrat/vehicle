import { Request, Response } from "express";
import { userServices } from "./user.services";

const getUsers = async (req: Request, res: Response) => {
  console.log("req.user: ", req.user);
  try {
    const response = await userServices.getUsers();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: response.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};
// const getSingleUser = () => {};
const updateUser = async (req: Request, res: Response) => {
  try {
    const response = await userServices.updateUser(
      req.params.userId!,
      req.body,
      req.user.role
    );
    const updatedData = { ...response.rows[0] };
    delete updatedData["password"];
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedData,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const response = await userServices.deleteUser(req.params.userId!);
    console.log(response);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const userControllers = {
  getUsers,
  // getSingleUser,
  updateUser,
  deleteUser,
};
