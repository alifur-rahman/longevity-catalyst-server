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
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  FILE_UPLOAD_DIR: process.env.FILE_UPLOAD_DIR,
};
