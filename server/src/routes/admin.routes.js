import { Router } from "express";
import {
  getAllUsers,
  deleteUser,
  updateUserRole,
  adminStats,
} from "../controllers/admin.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

/* All routes below are ADMIN ONLY */
router.use(verifyJwt, authorizeRoles("admin"));

router.get("/users", getAllUsers);
router.delete("/user/:userId", deleteUser);
router.patch("/user/:userId/role", updateUserRole);
router.get("/stats", adminStats);

export default router;
