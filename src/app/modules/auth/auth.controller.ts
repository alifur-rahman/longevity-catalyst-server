import { Request, Response } from "express";
import httpStatus, { FORBIDDEN } from "http-status";
import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "./auth.interface";
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  try {
    const payload: ILoginUser = req.body;

    const result = await AuthService.loginUser(payload);
    // set access token into cookie
    if (result) {
      const { refreshToken } = result;
      const cookieOptions = {
        secure: config.env === "production",
        httpOnly: true,
        // sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      };
      res.cookie("jwt", refreshToken, cookieOptions);
    }

    sendResponse<ILoginUserResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User logged in successfully!",
      data: result.userInfo,
    });
  } catch (error) {
    sendResponse<ILoginUserResponse>(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: `${error}`,
    });
  }
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    sendResponse<IRefreshTokenResponse>(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: "Unauthorized Request!",
    });
  } else {
    try {
      const refreshToken = cookies.jwt;
      const result = await AuthService.refreshToken(refreshToken);
      // Set the new access token into a cookie
      // const newAccessToken = result.accessToken;
      // const cookieOptions = {
      //   secure: config.env === "production",
      //   httpOnly: true,
      // };
      // res.cookie("accessToken", newAccessToken, cookieOptions);

      sendResponse<IRefreshTokenResponse>(res, {
        statusCode: 200,
        success: true,
        message: "Access token Created !",
        data: result,
      });
    } catch (error) {
      sendResponse<IRefreshTokenResponse>(res, {
        statusCode: FORBIDDEN,
        success: false,
        message: `${error}`,
      });
    }
  }
});

export const AuthController = {
  loginUser,
  refreshToken,
};
