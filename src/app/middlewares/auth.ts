import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import { jwtHelpers } from "../../helpers/jwtHelpers";

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      // Verify token
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.secret as Secret
      );

      // Check if verifiedUser is not null
      if (!verifiedUser) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      // Role-based authorization
      if (
        requiredRoles.length &&
        !requiredRoles.includes(verifiedUser.userRole)
      ) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
      }

      req.user = verifiedUser;
      next();
    } catch (error) {
      next(error);
    }
  };
export default auth;
