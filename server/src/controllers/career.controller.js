import {asyncHandler} from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js";
import {apiResponse} from "../utils/apiResponse.js";
import { Career } from "../models/career.model.js";

const createCareer = asyncHandler(async (req, res) => {
  const {
    title,
    category,
    description,
    detailedDescription,
    averageSalary,
    jobGrowth,
    educationRequired,
    keySkills = [],
    workEnvironment,
    popularCourses = [],
    careerLevels = [],
    streamRequired = [],
    dailyActivities = [],
    workCulture,
    topEmployers = [],
    salaryProgression = [],
    entranceExams = [],
    topColleges = [],
    futureScope,
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
    detailedDescription: detailedDescription?.trim(),
    averageSalary: averageSalary?.trim(),
    jobGrowth: jobGrowth?.trim(),
    educationRequired: educationRequired?.trim(),
    keySkills,
    workEnvironment: workEnvironment?.trim(),
    popularCourses,
    careerLevels,
    streamRequired,
    dailyActivities,
    workCulture: workCulture?.trim(),
    topEmployers,
    salaryProgression,
    entranceExams,
    topColleges,
    futureScope: futureScope?.trim(),
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

const getCareerBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const career = await Career.findOne({ slug });
  if (!career) {
    throw new apiError(404, "Career not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, career, "Career fetched"));
});

const updateCareer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const career = await Career.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });

  if (!career) {
    throw new apiError(404, "Career not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, career, "Career updated"));
});

const deleteCareer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const career = await Career.findByIdAndDelete(id);
  if (!career) {
    throw new apiError(404, "Career not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, null, "Career deleted"));
});


export {
    createCareer,
    getAllCareers,
    getCareerBySlug,
    updateCareer,
    deleteCareer,
}