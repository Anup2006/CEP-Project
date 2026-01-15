import mongoose from "mongoose";
import dotenv from "dotenv";
import { Webinar } from "../models/webinar.model.js";
import {User} from "../models/user.model.js";
import { DB_NAME} from "../constants.js";

dotenv.config();

await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
const admin = await User.findOne({ role: "admin" });

if (!admin) {
  throw new Error("Admin user not found. Seed users first.");
}

const webinars=[
    {
        title: "Career in AI & ML",
        description: "Future scope and roadmap",
        date: new Date("2026-02-10T15:00:00"),
        duration: 120,
        speaker: {
          name: "Dr. Raj Patel",
          bio: "AI Researcher"
        },
        meetingLink: "https://meet.google.com/abc-def",
        platform:"google meet",
        capacity: 150,
        status: "upcoming",
        createdBy: admin._id
    },
    {
        title: "How to Crack Product Companies",
        description: "Interview preparation strategies",
        date: new Date("2026-02-15T11:00:00"),
        duration: 90,
        speaker: {
          name: "Neha Verma",
          bio: "Ex-Amazon SDE"
        },
        meetingLink: "https://zoom.us/j/987654",
        platform:"zoom",
        capacity: 200,
        status: "upcoming",
        createdBy: admin._id
    },
    {
        title: "Introduction to Data Science Roadmap",
        description: "An end-to-end overview of data science careers, required skills, tools, and learning roadmap for beginners.",
        date: new Date("2025-12-05T16:00:00"),
        duration: 110,
        speaker: {
        name: "Krish Naik",
        bio: "Data Scientist, YouTuber, and AI Educator"
        },
        meetingLink: "https://zoom.us/j/456789123",
        platform:"zoom",
        capacity: 300,
        status: "completed",
        recordingUrl: "https://www.youtube.com/watch?v=ua-CiDNNj30",
        createdBy: admin._id
    }
]

const seedWebinars = async () => {
    await Webinar.deleteMany();
    for (const webinar of webinars) {
        await Webinar.create(webinar);
    }
    console.log("✅ Webinars seeded successfully");
    process.exit();
};

seedWebinars();
