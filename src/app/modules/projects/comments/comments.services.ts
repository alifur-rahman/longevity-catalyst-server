/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../../errors/ApiError";
import { paginationHelpers } from "../../../../helpers/paginationHelpers";
import { utilities } from "../../../../helpers/utilities";
import { User } from "../../user/user.model";
import { Project } from "../project.model";
import Comment from "./comments.model";

const createComment = async (
  token: string,
  projectId: number,
  commentText: string
) => {
  if (!token || !commentText || !projectId) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Invalid input data");
  }
  const userId = utilities.getUserIdByToken(token);
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }

  const checkProject = await Project.findByPk(projectId);

  if (!checkProject) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
  }
  // console.log(projectId);
  const createdComment = await Comment.create({
    userId,
    commentText,
    projectId,
  });

  const user = await User.findByPk(userId, {
    attributes: ["id", "full_name", "username", "email", "profileImage"],
  });

  // Append user data to the comment object
  const commentWithUserData = {
    ...createdComment.toJSON(),
    User: user,
  };

  return commentWithUserData as Comment;

  // Handle if comment or user doesn't exist or if there's an error

  // return createdComment.toJSON() as Comment;
};

const updateComment = async (
  token: string,
  commentId: number,
  commentText: string
) => {
  if (!token || !commentId || !commentText) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Invalid input data");
  }
  const userId = utilities.getUserIdByToken(token);

  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }
  const commentToUpdate = await Comment.findByPk(commentId);

  if (!commentToUpdate) {
    throw new ApiError(httpStatus.NOT_FOUND, "Comment not found");
  }

  if (commentToUpdate.userId !== userId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You are not allowed to update this comment"
    );
  }

  commentToUpdate.commentText = commentText || commentToUpdate.commentText;
  commentToUpdate.updatedAt = new Date();

  await commentToUpdate.save();

  return commentToUpdate;
};

const deleteComment = async (token: string, commentId: number) => {
  const userId = utilities.getUserIdByToken(token);

  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }

  const comment = await Comment.findOne({ where: { id: commentId } });
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, "Comment not found");
  }

  if (comment.userId !== userId) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Forbidden: You do not have permission to delete this comment"
    );
  }

  await comment.destroy();
  return comment;
};

const getAllCommentByProject = async (
  projectId: number,
  paginationOptions: any
) => {
  if (!projectId) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project are not found");
  }
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const options = {
    where: {
      projectId: projectId,
    },
    offset: skip,
    limit,
    order: [] as [string, string][],
    include: [
      {
        model: User,
        attributes: ["id", "full_name", "username", "email", "profileImage"],
      },
    ],
    distinct: true,
    subQuery: false,
  };
  if (sortBy && sortOrder) {
    options.order.push([sortBy, sortOrder]);
  }
  const result = await Comment.findAndCountAll(options);
  const total = result.count;

  const responseData = {
    meta: {
      page,
      limit,
      total,
    },
    data: result.rows,
  };
  return responseData;
};

export const commentService = {
  createComment,
  getAllCommentByProject,
  updateComment,
  deleteComment,
};
