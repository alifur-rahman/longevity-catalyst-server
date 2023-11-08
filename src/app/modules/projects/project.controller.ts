import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProjectService } from "./project.services";

const createProject = catchAsync(async (req: Request, res: Response) => {
  try {
    const projectData = req.body;
    console.log(projectData);
    const project = await ProjectService.createProject(projectData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Project Created successfully!",
      data: project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const projectData = req.body;
    const updatedProject = await ProjectService.updateProject(
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
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const deletedProject = await ProjectService.deleteProject(projectId);
    if (deletedProject) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  try {
    const projects = await ProjectService.getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const project = await ProjectService.getSingleProject(projectId);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export const projectController = {
  createProject,
  updateProject,
  getAllProjects,
  getSingleProject,
  deleteProject,
};
