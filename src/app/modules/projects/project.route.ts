import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { projectController } from "./project.controller";

const router = express.Router();

// Define routes
router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getSingleProject);

router.post(
  "/create-project",
  auth(
    ENUM_USER_ROLE.REGULARUSER,
    ENUM_USER_ROLE.RESEARCHER,
    ENUM_USER_ROLE.CONTRIBUTOR,
    ENUM_USER_ROLE.ADMIN
  ),
  projectController.createProject
);
router.delete(
  "/:id",
  auth(
    ENUM_USER_ROLE.REGULARUSER,
    ENUM_USER_ROLE.CONTRIBUTOR,
    ENUM_USER_ROLE.ADMIN
  ),
  projectController.deleteProject
);
router.patch(
  "/:id",
  auth(
    ENUM_USER_ROLE.REGULARUSER,
    ENUM_USER_ROLE.CONTRIBUTOR,
    ENUM_USER_ROLE.ADMIN
  ),
  projectController.updateProject
);

export const ProjectRouter = router;
