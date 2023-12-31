/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../../errors/ApiError";
import { utilities } from "../../../../helpers/utilities";
import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";
import { ProjectCategoriesService } from "./projectCategory.services";

const getAllProjectsCategories = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
    }

    const isAuthorized = utilities.verifiedTokenAndDb(token);
    if (!isAuthorized) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
    }

    const result = await ProjectCategoriesService.getAllProjectCategories();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Here is the all Projects categories",
      data: result,
    });
  }
);

export const projectCategoryController = {
  getAllProjectsCategories,
};
