import express from "express";
// import { upload } from "../../../helpers/uploadHelpers";
import handleFormidableMiddleware from "../../middlewares/formAbleMidd";
import { UserController } from "./user.controller";

const router = express.Router();

// Define routes
router.post("/signup", handleFormidableMiddleware, UserController.createUser);
router.get("/", UserController.getUsers);
router.get("/:username", UserController.getUserByUserName);

export const UserRoutes = router;
