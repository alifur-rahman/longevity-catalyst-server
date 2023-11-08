import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../../errors/ApiError";
import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";
import { commentService } from "./comments.services";

const createComment = catchAsync(async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    const commentData = req.body;

    const result = await commentService.createComment(commentData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Comment Created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const updateComment = catchAsync(async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const projectData = req.body;
    const updatedProject = await commentService.updateComment(
      projectId,
      projectData
    );
    if (updatedProject) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Project Data Update successfully!",
        data: updatedProject,
      });
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, "Project not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const deletedProject = await commentService.deleteComment(projectId);
    if (deletedProject) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getSingleComment = catchAsync(async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const project = await commentService.getSingleComment(projectId);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export const commentController = {
  createComment,
  updateComment,
  deleteComment,
  getSingleComment,
};
