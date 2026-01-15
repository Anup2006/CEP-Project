import { Webinar } from "../models/webinar.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";

const addRecordingLink = asyncHandler(async (req, res) => {
  const { id } = req.params; 
  const { recordingUrl } = req.body;

  const webinar = await Webinar.findById(id);

  if (!webinar) {
    throw new apiError(404, "Webinar not found");
  }

  const now = new Date();
  const end = new Date(new Date(webinar.date).getTime() + (webinar.duration || 60) * 60000);

  if (now < end) {
    throw new apiError(400, "Webinar is not completed yet");
  }

  webinar.recordingUrl = recordingUrl.trim();
  await webinar.save();

  return res.status(200).json(new apiResponse(200, webinar, "Recording link added successfully"));
});

const createWebinar = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    date,
    duration,
    meetingLink,
    platform,
    capacity,
    speaker,
  } = req.body;

  if (!title || !date || !meetingLink) {
    throw new apiError(400, "Required fields missing");
  }

  const webinar = await Webinar.create({
    title: title.trim(),
    description,
    date,
    duration,
    meetingLink: meetingLink.trim(),
    platform:platform.trim(),
    capacity,
    speaker,
    createdBy: req.user._id,
  });

  return res
    .status(201)
    .json(new apiResponse(201, webinar, "Webinar created"));
});

const getAllWebinars = asyncHandler(async (req, res) => {
  const webinars = await Webinar.find()
    .sort({ date: 1 })
    .populate("createdBy", "name email");

  return res
    .status(200)
    .json(new apiResponse(200, webinars, "All webinars"));
});

const getWebinarById = asyncHandler(async (req, res) => {
  const webinar = await Webinar.findById(req.params.id).populate("createdBy", "fullname email role");

  if (!webinar) {
    throw new apiError(404, "Webinar not found");
    }

  if (
        webinar.status !== "live" &&
        !webinar.registeredUsers.includes(req.user?._id) &&
        req.user?.role === "student"
    ) {
        webinar.meetingLink = null;
    }

  if (!webinar) {
    throw new apiError(404, "Webinar not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, webinar, "Webinar details"));
});

const registerForWebinar = asyncHandler(async (req, res) => {
  const webinar = await Webinar.findById(req.params.id);

  if (!webinar) {
    throw new apiError(404, "Webinar not found");
  }

    const alreadyRegistered = webinar.registeredUsers.some(
        (userId) => userId.toString() === req.user._id.toString()
    );
    if (alreadyRegistered) {
        throw new apiError(400, "Already registered");
    }

  if (webinar.registeredUsers.length >= webinar.capacity) {
    throw new apiError(400, "Webinar is full");
  }
  
  webinar.registeredUsers.push(req.user._id);
  await webinar.save();

  return res
    .status(200)
    .json(new apiResponse(200, null, "Registered successfully"));
});

const deleteWebinar = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const webinar = await Webinar.findById(id);

  if (!webinar) {
    throw new apiError(404, "Webinar not found");
  }

  await Webinar.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new apiResponse(200, null, "Webinar deleted successfully"));
});


export {
    createWebinar,
    getAllWebinars,
    registerForWebinar,
    getWebinarById,
    deleteWebinar,
    addRecordingLink,
}