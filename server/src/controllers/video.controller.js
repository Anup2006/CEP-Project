import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Video } from "../models/video.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import axios from "axios";

function formatDuration(iso) {
  if (!iso) return null;
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  const hours = match[1] ? String(match[1]).padStart(2, "0") : null;
  const minutes = match[2] ? String(match[2]).padStart(2, "0") : "00";
  const seconds = match[3] ? String(match[3]).padStart(2, "0") : "00";

  return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
}

const addVideoByAdmin = asyncHandler(async (req, res) => {
  const { title, description, duration, category, youtubeUrl } = req.body;

  if (!title || !description || !category) {
    throw new apiError(400, "Required fields are missing");
  }

  let videoData = {
    title,
    description,
    duration,
    category,
    addedBy: req.user._id,
  };

    // YOUTUBE VIDEO 
  if (youtubeUrl) {
    const videoId = youtubeUrl.split("v=")[1]?.split("&")[0];
    if (!videoId) {
      throw new apiError(400, "Invalid YouTube URL");
    }

    const ytResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet",
          id: videoId,
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );

    if (!ytResponse.data.items.length) {
      throw new apiError(404, "YouTube video not found");
    }

    const thumbs = ytResponse.data.items[0].snippet.thumbnails;

    const exactThumbnail =
      thumbs.maxres?.url ||
      thumbs.standard?.url ||
      thumbs.high?.url ||
      thumbs.medium?.url ||
      thumbs.default?.url;

    videoData.source = "youtube";
    videoData.youtubeVideoId = videoId;
    videoData.thumbnail = exactThumbnail;
  }

    // CLOUDINARY VIDEO 
  if (req.file) {
    const uploaded = await uploadOnCloudinary(req.file.path);

    if (!uploaded) {
      throw new apiError(500, "Video upload failed");
    }

    const thumbnail = cloudinary.url(uploaded.public_id, {
      resource_type: "video",
      format: "jpg",
      transformation: [
        { width: 1280, height: 720, crop: "fill" },
        { start_offset: "auto" },
      ],
    });

    videoData.source = "cloudinary";
    videoData.videoUrl = uploaded.secure_url;
    videoData.publicId = uploaded.public_id;
    videoData.thumbnail = thumbnail;
  }

  const video = await Video.create(videoData);

  return res
    .status(201)
    .json(new apiResponse(201, video, "Video added successfully"));
});

const searchYoutubeVideos = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim() === "") {
    throw new apiError(400, "Search query is required");
  }

  try {
    //basic info 
    const searchResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q,
          type: "video",
          maxResults: 10,
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );

    const videoItems = searchResponse.data.items;

    if (!videoItems.length) {
      return res
        .status(200)
        .json(new apiResponse(200, [], "No videos found"));
    }

    const videoIds = videoItems.map((item) => item.id.videoId).join(",");

    //duration,views
    const detailsResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "contentDetails,statistics",
          id: videoIds,
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );

    //Merge data
    const videos = videoItems.map((item) => {
      const details = detailsResponse.data.items.find(
        (v) => v.id === item.id.videoId
      );

      const thumbnail =
        item.snippet.thumbnails.maxres?.url ||
        item.snippet.thumbnails.high?.url ||
        item.snippet.thumbnails.medium?.url ||
        item.snippet.thumbnails.default?.url;

      return {
        title: item.snippet.title,
        description: item.snippet.description,
        source: "youtube", 
        youtubeVideoId: item.id.videoId,
        channelName: item.snippet.channelTitle,
        thumbnail,
        duration: formatDuration(details?.contentDetails?.duration),
        views: Number(details?.statistics?.viewCount || 0),
        publishedAt: item.snippet.publishedAt,
      };
    });
    return res
      .status(200)
      .json(new apiResponse(200, videos, "YouTube videos fetched successfully"));
  } catch (error) {
    console.error(error.response?.data || error);
    throw new apiError(500, "YouTube search failed");
  }
});

const getAllVideos = asyncHandler(async (req, res) => {
  const videos = await Video.find().sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new apiResponse(200, videos, "Videos fetched successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const video = await Video.findById(id);
  if (!video) {
    throw new apiError(404, "Video not found");
  }

  // Remove Cloudinary asset if needed
  if (video.source === "cloudinary" && video.publicId) {
    await cloudinary.uploader.destroy(video.publicId, {
      resource_type: "video",
    });
  }

  await video.deleteOne();

  return res
    .status(200)
    .json(new apiResponse(200, {}, "Video deleted successfully"));
});

export {
  addVideoByAdmin,
  getAllVideos,
  searchYoutubeVideos,
  deleteVideo,
};
