import {Router} from "express";
import { getQuizQuestions,submitQuiz } from "../controllers/quiz.controller.js";
const router = Router()

router.route("/questions").get(getQuizQuestions);
router.route("/submit").post( submitQuiz);

export default router;
