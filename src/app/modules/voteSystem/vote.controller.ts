import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { voteService } from "./vote.services";

const createVote = catchAsync(async (req: Request, res: Response) => {
  try {
    const voteData = req.body;

    const result = await voteService.createVote(voteData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Vote recorded",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

const getVotebyProject = catchAsync(async (req: Request, res: Response) => {
  try {
    const projectid = Number(req.params.projectId);
    const result = await voteService.getVoteByProject(projectid);

    sendResponse(res, {
      statusCode: result ? 200 : 400,
      success: result ? true : false,
      message: result ? "Here is project votes" : "Project not found",
      data: result,
    });
  } catch (error) {
    console.log(error);

    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "An error occurred",
      data: null,
    });
  }
});

export const voteController = {
  createVote,
  getVotebyProject,
};
