import {QuizQuestion} from "../models/quizQuestion.model.js";
import {Career} from "../models/career.model.js";
import {QuizResult} from "../models/quizResult.model.js";
import { calculateTraitScores, matchCareers } from "../utils/quizService.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

const getQuizQuestions = asyncHandler(async (req, res) => {
  const questions = await QuizQuestion.find();
  return res
    .status(200)
    .json(new apiResponse(200, questions, "All quiz questions fetched"));
});

const submitQuiz = asyncHandler(async (req, res) => {
  const { answers } = req.body;

  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    throw new apiError(400, "Answers are required and must be a non-empty array");
  }

  const traitScoresObj = calculateTraitScores(answers);

  //Convert trait scores → array for QuizResult model
  const traitScoresArray = Object.entries(traitScoresObj).map(
    ([trait, score]) => ({ trait, score })
  );

  //Fetch all careers
  const careers = await Career.find();

  if (!careers || careers.length === 0) {
    throw new apiError(404, "No careers found to match");
  }

  //Match careers using trait scores
  const recommendations = matchCareers(careers, traitScoresObj);

  //Save quiz result
  const result = await QuizResult.create({
    userId: req.user?._id || null, 
    traitScores: traitScoresArray,
    recommendedCareers: recommendations.map(r => r.careerId)
  });

  //Send response
  return res.status(201).json(
    new apiResponse(201, {
      traitScores: traitScoresArray,
      recommendations,
      resultId: result._id
    }, "Quiz submitted successfully")
  );
});

export {
  getQuizQuestions,
  submitQuiz
};