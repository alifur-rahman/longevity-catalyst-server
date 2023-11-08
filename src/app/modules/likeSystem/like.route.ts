import express from "express";
import { likeController } from "./like.controller";

const router = express.Router();

// Define routes
router.post("/", likeController.createLike);
router.get("/", likeController.getAllLikes);

export const LikeRouter = router;
