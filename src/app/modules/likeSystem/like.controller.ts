import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { LikeInstance } from "./like.model";
import { likeService } from "./like.services";

const createLike = catchAsync(async (req: Request, res: Response) => {
  try {
    const likeData: LikeInstance = req.body;

    const result = await likeService.createLike(likeData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

const getAllLikes = catchAsync(async (req: Request, res: Response) => {
  const { projectId } = req.params;

  const getLikes = await likeService.getAllLikes(projectId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "retrieved successfully",
    data: getLikes,
  });
});

export const likeController = {
  createLike,
  getAllLikes,
};
