import dotenv from "dotenv";
import path from "path";

const dotenvResult = dotenv.config({ path: path.join(process.cwd(), ".env") });

if (dotenvResult.error) {
  throw dotenvResult.error;
}

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mysql_user: process.env.MYSQL_USER,
  mysql_password: process.env.MYSQL_PASSWORD,
  mysql_database: process.env.MYSQL_DATABASE,

  database_url: process.env.MYSQL_HOST,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
};
