/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { LikeModel } from "./like.model";

const createLike = async (likeData: any) => {
  const { userId, likedItemId } = likeData;

  if (!userId || !likedItemId) {
    throw new ApiError(httpStatus.NOT_FOUND, "Error creating like");
  }

  const like = await LikeModel.create(likeData);

  return like;
};

const getAllLikes = async (projectId: any) => {
  const result = await LikeModel.findAll({
    where: { likedItemId: projectId },
  });

  return result;
};

export const likeService = {
  createLike,
  getAllLikes,
};
