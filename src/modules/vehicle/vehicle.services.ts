import { pool } from "../../config/db";

const insertVehicle = async (body: any) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = body;
  const response = await pool.query(
    `INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status)
    VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  return response;
};
const getVehicles = async () => {
  return await pool.query(`SELECT * FROM vehicles`);
};
const getSingleVehicle = async (vehicleId: string) => {
  return await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [vehicleId]);
};
const updateVehicle = async (vehicleId: string, body: any) => {
  const { daily_rent_price, availability_status } = body;
  const response = await pool.query(
    `
        UPDATE vehicles
        SET
            daily_rent_price = COALESCE($1, daily_rent_price),
            availability_status = COALESCE($2, availability_status)
        WHERE id = $3
        RETURNING *;
`,
    [daily_rent_price, availability_status, vehicleId]
  );
  return response;
};
const deleteVehicle = async (vehicleId: string) => {
  const response = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [
    vehicleId,
  ]);
  if (response.rows[0].availability_status === "booked") return false;
  else
    return await pool.query(
      `DELETE FROM vehicles
  WHERE id = $1;
  `,
      [vehicleId]
    );
};
export const vehicleServices = {
  insertVehicle,
  getVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
