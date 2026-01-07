import {Router} from "express";
import { getAllCareers } from "../controllers/career.controller.js";
const router = Router()

router.route("/").get(getAllCareers)

export default router;
