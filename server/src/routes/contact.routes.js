import {Router} from "express";
import { getUnreadMessages, sendMessage,markAsRead } from "../controllers/contact.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router()
router.route("/send").post(sendMessage)
router.route("/unread").get(
  verifyJwt,
  authorizeRoles("admin"),
  getUnreadMessages
)
router.route("/:id/read").patch(
  verifyJwt,
  authorizeRoles("admin"),
  markAsRead
);

export default router;
