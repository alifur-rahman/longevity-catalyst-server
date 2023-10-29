import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { commentRoute } from "../modules/projects/comments/comments.route";
import { ProjectRouter } from "../modules/projects/project.route";
import { replyRoute } from "../modules/projects/reply/reply.route";
import { userSkillRoute } from "../modules/user/user-skills/skills.route";
import { UserRoutes } from "../modules/user/user.router";

const router = express.Router();
const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/skills",
    route: userSkillRoute,
  },
  {
    path: "/projects",
    route: ProjectRouter,
  },
  {
    path: "/comment",
    route: commentRoute,
  },
  {
    path: "/reply",
    route: replyRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
