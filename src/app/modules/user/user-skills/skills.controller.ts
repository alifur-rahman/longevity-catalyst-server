// user-skill.controller.ts
import { Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../../config";
import ApiError from "../../../../errors/ApiError";
import { jwtHelpers } from "../../../../helpers/jwtHelpers";
import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";
import { userSkillServices } from "./skills.service";

const createUserSkill = catchAsync(async (req: Request, res: Response) => {
  const { skillName } = req.body;
  const token = req.headers.authorization;

  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }
  console.log("Here is token", token);
  const varifyedToken = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );

  const { userId } = varifyedToken;
  const userSkill = await userSkillServices.createUserSkill(userId, skillName);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill Create Successfull",
    data: userSkill,
  });
});

export const userSkillController = {
  createUserSkill,
};
