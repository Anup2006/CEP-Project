import mongoose from "mongoose";
import dotenv from "dotenv";
import { Career } from "../models/career.model.js";
import careers from "./careers.data.js";
import { DB_NAME} from "../constants.js";

dotenv.config();

const seed = async () => {
  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
  for (const career of careers) {
    await Career.create(career);
  }
  console.log("✅ Careers seeded successfully");
  process.exit();
};

seed();
