import { ProjectService } from "./project.services";

export const createProject = async (req: Request, res: Response) => {
  try {
    const projectData = req.body;
    const project = await ProjectService.createProject(projectData);
    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const projectData = req.body;
    const updatedProject = await ProjectService.updateProject(
      projectId,
      projectData
    );
    if (updatedProject) {
      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
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
};

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectService.getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSingleProject = async (req: Request, res: Response) => {
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
};

export const projectController = {
  createProject,
  updateProject,
  getAllProjects,
  getSingleProject,
  deleteProject,
};
