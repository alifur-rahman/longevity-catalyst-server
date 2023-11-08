import express from "express";
import { UserController } from "../user/user.controller";
import { AuthController } from "./auth.controller";
const router = express.Router();

router.post("/login", AuthController.loginUser);
router.post("/signup", UserController.createUser);

router.post("/refresh-token", AuthController.refreshToken);

export const AuthRoutes = router;
