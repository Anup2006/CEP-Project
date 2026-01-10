import {Router} from "express";
import { createCareer, deleteCareer, getAllCareers, getCareerBySlug, updateCareer } from "../controllers/career.controller.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/create-career").post(verifyJwt, authorizeRoles("admin"),createCareer)
router.route("/").get(getAllCareers)
router.route("/:slug").get(getCareerBySlug)
router.route("/update-career/:id").patch(verifyJwt,authorizeRoles("admin"),updateCareer)
router.route("/:id").delete(verifyJwt,authorizeRoles("admin"),deleteCareer)

export default router;
