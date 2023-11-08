import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Op, Optional } from "sequelize";
import { NullishPropertiesOf } from "sequelize/types/utils";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { handleFileUpload } from "../../../helpers/uploadHelpers";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (
  userData: Optional<IUser, NullishPropertiesOf<IUser>> | undefined
) => {
  if (!userData?.password) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "password. Password is required to create a user"
    );
    console.log(userData);
  }
  // Check if the username or email is already in use
  const existingUsername = await User.findOne({
    where: {
      [Op.or]: [{ username: userData.username }],
    },
  });

  if (existingUsername) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "username.Username is already use !"
    );
  }

  // Check if Email is already in use
  const existingEmail = await User.findOne({
    where: {
      [Op.or]: [{ email: userData.email }],
    },
  });

  if (existingEmail) {
    throw new ApiError(httpStatus.CONFLICT, "email.Email is already use !");
  }
  // const readyToStore = userData;
  if (userData.profile_photo) {
    await handleFileUpload(userData.profile_photo, config.FILE_UPLOAD_DIR)
      .then((imagePath) => {
        userData.profile_photo = imagePath;
      })
      .catch(() => {
        // Handle the rejected promise
        throw new ApiError(
          httpStatus.CONFLICT,
          "profile_photo.Email is already use !"
        );
      });
  }

  const hashedPassword = await bcrypt.hash(
    userData.password,
    Number(config.bcrypt_salt_rounds)
  );

  userData.password = hashedPassword;

  const user = await User.create(userData);

  return user;
};

// For all users
const getUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ["password", "id"] },
  });
  return users;
};

// For Single User
const getUserByUserName = async (username: string) => {
  const user = await User.findOne({
    where: { username: username },
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User Not Found");
  }

  return user;
};

export const userService = {
  createUser,
  getUsers,
  getUserByUserName,
};
