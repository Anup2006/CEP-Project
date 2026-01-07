import {asyncHandler} from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js";
import {apiResponse} from "../utils/apiResponse.js";
import { Career } from "../models/career.model.js";

const createCareer = asyncHandler(async (req, res) => {
  const {
    title,
    category,
    description,
    averageSalary,
    jobGrowth,
    educationRequired,
    keySkills = [],
    workEnvironment,
    popularCourses = [],
    careerLevels = [],
    streamRequired = [],
  } = req.body;

  if (!title || !category || !description) {
    throw new apiError(400, "Title, category, and description are required");
  }

  const existingCareer = await Career.findOne({
    title: title.trim(),
    category: category.trim(),
  });

  if (existingCareer) {
    throw new apiError(409, "Career with this title and category already exists");
  }

  const career = await Career.create({
    title: title.trim(),
    category: category.trim(),
    description: description.trim(),
    averageSalary: averageSalary?.trim(),
    jobGrowth: jobGrowth?.trim(),
    educationRequired: educationRequired?.trim(),
    keySkills,
    workEnvironment: workEnvironment?.trim(),
    popularCourses,
    careerLevels,
    streamRequired,
  });

  return res.status(201).json(
    new apiResponse(201, career, "Career created successfully")
  );
});

const getAllCareers = asyncHandler(async (req, res) => {
  const careers = await Career.find();
  return res
    .status(200)
    .json(new apiResponse(200, careers, "All careers fetched"));
});

export {
    createCareer,
    getAllCareers,
}