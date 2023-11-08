import express from "express";
import { ENUM_USER_ROLE } from "../../../../enums/user";
import auth from "../../../middlewares/auth";
import { commentController } from "./comments.controller";

const router = express.Router();

// Define routes
router.post(
  "/",
  auth(
    ENUM_USER_ROLE.REGULARUSER,
    ENUM_USER_ROLE.CONTRIBUTOR,
    ENUM_USER_ROLE.ADMIN
  ),
  commentController.createComment
);
router.get(
  "/:id",
  auth(
    ENUM_USER_ROLE.REGULARUSER,
    ENUM_USER_ROLE.CONTRIBUTOR,
    ENUM_USER_ROLE.ADMIN
  ),
  commentController.getSingleComment
);
router.delete(
  "/:id",
  auth(
    ENUM_USER_ROLE.REGULARUSER,
    ENUM_USER_ROLE.CONTRIBUTOR,
    ENUM_USER_ROLE.ADMIN
  ),
  commentController.deleteComment
);
router.patch(
  "/:id",
  auth(
    ENUM_USER_ROLE.REGULARUSER,
    ENUM_USER_ROLE.CONTRIBUTOR,
    ENUM_USER_ROLE.ADMIN
  ),
  commentController.updateComment
);

export const commentRoute = router;
