import mongoose from "mongoose";
import dotenv from "dotenv";
import { StudyMaterial } from "../models/studyMaterial.model.js";
import {User} from "../models/user.model.js";
import { DB_NAME} from "../constants.js";

dotenv.config();

await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
const admin = await User.findOne({ role: "admin" });

if (!admin) {
  throw new Error("Admin user not found. Seed users first.");
}

const materials=[
    {
        title: "Medical Career Pathways",
        description:
        "Detailed information about NEET preparation, medical specializations, and career opportunities.",
        category: "Medical",
        pages: 67,
        type: "PDF",
        fileUrl:
        "https://res.cloudinary.com/demo/raw/upload/v1690000000/medical-career-pathways.pdf",
        publicId: "medical-career-pathways",
        uploadedBy: admin._id,
    },
    {
        title: "Commerce Stream Opportunities",
        description:
        "Guide to CA, CS, finance careers, and business opportunities for commerce students.",
        category: "Commerce",
        pages: 52,
        type: "PDF",
        fileUrl:
        "https://res.cloudinary.com/demo/raw/upload/v1690000000/commerce-stream-opportunities.pdf",
        publicId: "commerce-stream-opportunities",
        uploadedBy: admin._id,
    },
]

const seedMaterials = async () => {
    await StudyMaterial.deleteMany();
    for (const material of materials) {
        await StudyMaterial.create(material);
    }
    console.log("StudyMaterials seeded successfully");
    process.exit();
};

seedMaterials();
