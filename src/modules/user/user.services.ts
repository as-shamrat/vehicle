import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
const getUsers = async () => {
  const response = await pool.query(`SELECT * FROM users`);
  return response;
};

const updateUser = async (
  userId: number | string,
  body: any,
  currentRole: string
) => {
  let { name, email, phone, role, password } = body;
  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 8);
  }
  if (currentRole !== "admin") {
    role = undefined;
  }
  const response = await pool.query(
    `UPDATE users SET 
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        phone = COALESCE($3, phone),
        role = COALESCE($4, role),
        password = COALESCE($5, password)
    WHERE id = $6`,
    [name, email, phone, role, hashedPassword, userId]
  );
  const updatedResponse = await pool.query(
    `SELECT * FROM users WHERE id = $1`,
    [userId]
  );
  return updatedResponse;
};

const deleteUser = async (userId: string) => {
  const response = await pool.query(
    `
        DELETE FROM users WHERE id = $1
        `,
    [userId]
  );
  return response;
};

export const userServices = { getUsers, updateUser, deleteUser };
