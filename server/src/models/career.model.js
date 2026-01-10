import mongoose,{Schema} from "mongoose";
import createSlug from "../utils/slugify.js";

const careerSchema = new Schema({
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    detailedDescription:{
      type:String,
    },
    description: {
        type: String,
        required: true
    },
    averageSalary: String,
    jobGrowth: String,
    educationRequired: String,
    keySkills: [String],
    workEnvironment: String,
    careerLevels: [String],
    streamRequired: [String],
    dailyActivities: {
      type: [String],
      default: []
    },
    workCulture: {
      type: String
    },
    topEmployers: {
      type: [String],
      default: []
    },
    salaryProgression: [
      {
        level: String,
        range: String
      }
    ],
    entranceExams: {
      type: [String],
      default: []
    },
    topColleges: {
      type: [String],
      default: []
    },
    futureScope: {
      type: String
    },
    popularCourses: {
      type: [String],
      default: []
    }
},{timestamps:true})

careerSchema.index({ title: 1, category: 1 }, { unique: true });

careerSchema.pre("save", async function (next) {
  if (!this.isNew || this.slug) return next();

  const baseSlug = createSlug(`${this.title}-${this.category}`);
  let slug = baseSlug;
  let count = 0;

  while (await mongoose.models.Career.findOne({ slug })) {
    count++;
    slug = `${baseSlug}-${count}`;
  }

  this.slug = slug;
  next();
});

export const Career= mongoose.model('Career',careerSchema);