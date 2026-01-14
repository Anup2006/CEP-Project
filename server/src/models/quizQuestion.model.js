import mongoose,{Schema} from "mongoose";

const optionSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  traits: [
    {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    }
  ],
});

const quizQuestionSchema = new Schema(
  {
    question: {
      type: String,
      required: true
    },
    options: {
      type: [optionSchema],
      default:[],
    }
  },
  { timestamps: true }
);

export const QuizQuestion = mongoose.model("QuizQuestion",quizQuestionSchema);
