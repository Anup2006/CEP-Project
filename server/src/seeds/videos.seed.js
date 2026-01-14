import mongoose from "mongoose";
import dotenv from "dotenv";
import { Video } from "../models/video.model.js";
import { DB_NAME} from "../constants.js";

dotenv.config();

const seedVideos = [
  {
    title: "Cloudinary Sample Video",
    description: "This is a sample Cloudinary video",
    source: "cloudinary",
    videoUrl: "https://res.cloudinary.com/demo/video/upload/sample.mp4",
    thumbnail: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    duration: "03:12",
    category: "Tutorial",
  },
  {
    title: "Cloudinary Tutorial Video",
    description: "Learn how to use Cloudinary for videos",
    source: "cloudinary",
    videoUrl: "https://res.cloudinary.com/demo/video/upload/elephants.mp4",
    thumbnail: "https://res.cloudinary.com/demo/image/upload/elephants.jpg",
    duration: "05:45",
    category: "Tutorial",
  },
];

const seedDB = async () => {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    for (const video of seedVideos) {
      await Video.create(video);
    }
    console.log("✅ Careers seeded successfully");
    process.exit();
};

seedDB();
