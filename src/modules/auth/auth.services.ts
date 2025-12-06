import config from "../../config";
import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const signup = async (body: any) => {
  const { name, email, password, phone, role } = body;
  const hashedPassword = await bcrypt.hash(password, 8);
  const response = await pool.query(
    `
       INSERT INTO users (name, email, password, phone, role)
       VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `,
    [name, email, hashedPassword, phone, role]
  );
  return response;
};
const signin = async (email: string, password: string) => {
  const response = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  console.log(response.rowCount);
  if (response.rowCount === 0) {
    return null;
  }
  const user = response.rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) return false;

  return user;
};
export const authServices = { signup, signin };
