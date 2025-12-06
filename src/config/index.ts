import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), "./.env") });

const config = {
  port: process.env.PORT || 8080,
  dbConnectionString: process.env.DB_CONNECTION_STRING,
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
};

export default config;
