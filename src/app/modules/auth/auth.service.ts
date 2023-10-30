/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import { Op } from "sequelize";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { User } from "../user/user.model";
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "./auth.interface";
import RefreshToken from "./refreshToken.model";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { identifier, password } = payload;
  if (!identifier) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Username or email is required");
  }

  // Check if the user exists by email or username
  const user = await User.findOne({
    attributes: ["id", "role", "password"],
    where: {
      [Op.or]: [{ email: identifier }, { username: identifier }],
    },
  });

  if (!user) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      `No user found with username or email: ${identifier}`
    );
  }

  // Verify the password
  const isPasswordValid = await user.isPasswordMatch(
    password,
    user.getDataValue("password")
  );

  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  const { id: userId, role: userRole } = user;

  const accessToken = jwtHelpers.createToken(
    { userId, userRole },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, userRole },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  // Check if there is an existing refresh token for the user
  // eslint-disable-next-line prefer-const
  let existingRefreshToken = await RefreshToken.findOne({
    where: { userId: userId },
  });

  const twoHoursInMilliseconds = 2 * 60 * 60 * 1000;
  const expirationDate = new Date(Date.now() + twoHoursInMilliseconds);

  if (existingRefreshToken) {
    existingRefreshToken.token = refreshToken;
    existingRefreshToken.expiresAt = expirationDate;
    await existingRefreshToken.save();
  } else {
    await RefreshToken.create({
      userId: userId,
      token: refreshToken,
      expiresAt: expirationDate,
      createdAt: new Date(),
    });
  }

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // Verify the refresh token
  let verifiedToken: any;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  const { userId } = verifiedToken;

  // Check if the user exists
  const isUserExist = await User.findByPk(userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // Generate a new access token
  const newAccessToken = jwtHelpers.createToken(
    {
      userId: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};