import express from "express";
import { vehicleControllers } from "./vehicle.controllers";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", auth("admin"), vehicleControllers.insertVehicle);
router.get("/", vehicleControllers.getVehicles);
router.get("/:vehicleId", vehicleControllers.getSingleVehicle);
router.put("/:vehicleId", auth("admin"), vehicleControllers.updateVehicle);
router.delete("/:vehicleId", auth("admin"), vehicleControllers.deleteVehicle);

export default router;
