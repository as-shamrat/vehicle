import { Request, Response } from "express";
import { authServices } from "./auth.services";
import jwt from "jsonwebtoken";
import config from "../../config";
const signup = async (req: Request, res: Response) => {
  try {
    const response = await authServices.signup(req.body);
    const createdUser = response.rows[0];
    delete createdUser["password"];
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: createdUser,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};
const signin = async (req: Request, res: Response) => {
  try {
    const response = await authServices.signin(
      req.body.email,
      req.body.password
    );
    if (response === null || response === false) {
      return res.status(404).json({
        success: false,
        message: "User not found.Check your credentials",
      });
    }
    const loggedUser = response;
    delete loggedUser["password"];
    const token = jwt.sign(
      {
        email: loggedUser.email,
        role: loggedUser.role,
        customer_id: loggedUser.id,
      },
      config.jwtPrivateKey as string,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { token, user: loggedUser },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const authControllers = { signup, signin };
