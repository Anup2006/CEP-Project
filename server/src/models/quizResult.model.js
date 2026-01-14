import mongoose,{Schema} from "mongoose";


const traitScoreSchema = new mongoose.Schema(
  {
    trait: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true
    }
  },
  { _id: false }
);

const quizResultSchema = new Schema(
   {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false // 👈 IMPORTANT
    },
    traitScores: {
      type: [traitScoreSchema],
      required: true
    },
    recommendedCareers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Career"
      }
    ]
  },
  { timestamps: true }
);

export const QuizResult = mongoose.model("QuizResult",quizResultSchema);
