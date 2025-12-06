import { pool } from "../../config/db";

const createBooking = async (body: any) => {
  let { customer_id, vehicle_id, rent_start_date, rent_end_date } = body;
  const startTime = new Date(rent_start_date),
    endTime = new Date(rent_end_date);

  const totalDays =
    (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60 * 24);

  const res1 = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [
    vehicle_id,
  ]);
  const { vehicle_name, daily_rent_price, availability_status } = res1.rows[0];
  const total_price = totalDays * daily_rent_price;
  if (availability_status === "booked") return false;
  const res2 = await pool.query(
    `
      INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
      VALUES
      ($1, $2, $3, $4, $5, $6) RETURNING *
      `,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      "active",
    ]
  );
  const res3 = await pool.query(
    `UPDATE vehicles
    SET
        availability_status = COALESCE($1, availability_status)
    WHERE id = $2
    RETURNING *;
    `,
    ["booked", vehicle_id]
  );
  const returnResponseObj = {
    ...res2.rows[0],
    vehicle: { vehicle_name, daily_rent_price },
  };
  return returnResponseObj;
};
const getBookings = async (role: string, customer_id: string) => {
  await pool.query(`UPDATE bookings
    SET status = 'returned'
    WHERE rent_end_date < CURRENT_DATE
    AND status = 'active'
    RETURNING *;
    `);
  const usersRes = await pool.query("SELECT * FROM users");
  const vehiclesRes = await pool.query("SELECT * FROM vehicles");
  const users = usersRes.rows;
  const vehicles = vehiclesRes.rows;
  if (role === "admin") {
    const res = await pool.query("SELECT * FROM bookings");

    console.log(res);
    let adminBookings = res.rows;
    adminBookings = adminBookings.map((booking) => {
      const completeBooking = { ...booking };
      const customer = users.find((user) => user.id === booking.customer_id);
      const vehicle = vehicles.find(
        (vehicle) => vehicle.id === booking.vehicle_id
      );
      completeBooking.customer = { name: customer.name, email: customer.email };
      completeBooking.vehicle = {
        vehicle_name: vehicle.vehicle_name,
        registration_number: vehicle.registration_number,
      };
      return completeBooking;
    });
    return adminBookings;
  } else {
    const res = await pool.query(
      "SELECT * FROM bookings WHERE customer_id=$1",
      [customer_id]
    );
    let customerBookings = res.rows;
    customerBookings = customerBookings.map((booking) => {
      const completeBooking = { ...booking };
      const vehicle = vehicles.find(
        (vehicle) => vehicle.id === booking.vehicle_id
      );
      completeBooking.vehicle = {
        vehicle_name: vehicle.vehicle_name,
        registration_number: vehicle.registration_number,
        type: vehicle.type,
      };
      return completeBooking;
    });
    return customerBookings;
  }
  return null;
};
const updateBooking = async (body: any, bookingId: string, role: string) => {
  const res1 = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [
    bookingId,
  ]);
  const booking = res1.rows[0];
  if (role === "admin") {
    const res2 = await pool.query(
      `UPDATE bookings
        SET status = $1
        WHERE id = $2
        RETURNING *;
    `,
      [body.status, bookingId]
    );
    const res3 = await pool.query(
      `UPDATE vehicles SET availability_status = $1 WHERE id = $2 RETURNING *;`,
      ["available", booking.vehicle_id]
    );
    return {
      ...res2.rows[0],
      vehicle: { availability_status: res3.rows[0].availability_status },
    };
  } else {
    const startDate = new Date(booking.rent_start_date).getTime();
    const now = Date.now();
    if (now < startDate) {
      const res4 = await pool.query(
        `UPDATE bookings
        SET status = $1
        WHERE id = $2
        RETURNING *;
    `,
        [body.status, bookingId]
      );
      return res4.rows[0];
    }
  }
  return null;
};

export const bookingServices = { createBooking, getBookings, updateBooking };
