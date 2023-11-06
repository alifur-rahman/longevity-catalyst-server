import bcrypt from "bcrypt";
import { DataTypes, Model, Op } from "sequelize";
import sequelize from "../../../config/sequelize-config";
import { errorlogger } from "../../../shared/logger";

class User extends Model {
  static async isUserExist(identifier: string) {
    return User.findOne({
      where: {
        [Op.or]: [{ username: identifier }, { email: identifier }],
      },
    });
  }
  async isPasswordMatch(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "user",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.TEXT,
    },
    profile_photo: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);

sequelize
  .sync()
  .then(() => {})
  .catch((err) => {
    errorlogger.error("Error creating User table:", err);
  });

export { User };
