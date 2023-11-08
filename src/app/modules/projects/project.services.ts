/* eslint-disable @typescript-eslint/no-explicit-any */

import { Project } from "./project.model";

const createProject = async (projectData: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    Project.create(projectData)
      .then((project) => {
        resolve(project);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const updateProject = async (projectId: string, projectData: any) => {
  const project = await Project.findByPk(Number(projectId));
  if (project) {
    await project.update(projectData);
    return project;
  }
  return null;
};

const deleteProject = async (projectId: string) => {
  const project = await Project.findByPk(Number(projectId));
  if (project) {
    await project.destroy();
    return project;
  }
  return null;
};

const getAllProjects = async () => {
  return Project.findAll();
};

const getSingleProject = async (projectId: string) => {
  return Project.findByPk(Number(projectId));
};

export const ProjectService = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
