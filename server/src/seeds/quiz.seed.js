import mongoose from "mongoose";
import dotenv from "dotenv";
import { QuizQuestion } from "../models/quizQuestion.model.js";
import { DB_NAME,TRAITS } from "../constants.js";

dotenv.config();

export const quizQuestions = [
  {
    question: "What subjects do you enjoy the most in school?",
    options: [
      { text: "Science (Physics, Chemistry, Biology)", traits: [TRAITS.ANALYTICAL] },
      { text: "Mathematics", traits: [TRAITS.LOGICAL] },
      { text: "Humanities (History, Literature, Languages)", traits: [TRAITS.COMMUNICATION] },
      { text: "Commerce (Accounts, Economics)", traits: [TRAITS.STRATEGIC] },
      { text: "Creative Arts (Drawing, Music, Drama)", traits: [TRAITS.CREATIVE] }
    ]
  },
  {
    question: "What type of activities do you prefer?",
    options: [
      { text: "Hands-on experiments and practical work", traits: [TRAITS.TECHNICAL] },
      { text: "Creative projects and artistic expression", traits: [TRAITS.CREATIVE] },
      { text: "Solving complex problems and analysis", traits: [TRAITS.PROBLEM_SOLVING] },
      { text: "Working with people and helping others", traits: [TRAITS.EMPATHETIC] },
      { text: "Leading teams and organizing events", traits: [TRAITS.LEADERSHIP] }
    ]
  },
  {
    question: "What kind of work environment appeals to you?",
    options: [
      { text: "Modern office with technology", traits: [TRAITS.TECHNICAL] },
      { text: "Laboratory or research facility", traits: [TRAITS.ANALYTICAL] },
      { text: "Outdoor fieldwork", traits: [TRAITS.PROBLEM_SOLVING] },
      { text: "Creative studio or workshop", traits: [TRAITS.CREATIVE] },
      { text: "Hospital or healthcare facility", traits: [TRAITS.EMPATHETIC] }
    ]
  },
  {
    question: "What motivates you most in your future career?",
    options: [
      { text: "Helping people and making a difference", traits: [TRAITS.EMPATHETIC] },
      { text: "Innovation and creating new things", traits: [TRAITS.CREATIVE] },
      { text: "Financial success and stability", traits: [TRAITS.STRATEGIC] },
      { text: "Recognition and fame", traits: [TRAITS.LEADERSHIP] },
      { text: "Continuous learning and research", traits: [TRAITS.ANALYTICAL] }
    ]
  },
  {
    question: "How do you prefer to learn new things?",
    options: [
      { text: "Reading books and researching", traits: [TRAITS.ANALYTICAL] },
      { text: "Hands-on practice and experimentation", traits: [TRAITS.TECHNICAL] },
      { text: "Visual aids and demonstrations", traits: [TRAITS.CREATIVE] },
      { text: "Group discussions and collaboration", traits: [TRAITS.COMMUNICATION] },
      { text: "Online courses and digital media", traits: [TRAITS.TECHNICAL] }
    ]
  },
  {
    question: "What's your approach to problem-solving?",
    options: [
      { text: "Step-by-step logical analysis", traits: [TRAITS.LOGICAL] },
      { text: "Creative and innovative thinking", traits: [TRAITS.CREATIVE] },
      { text: "Team brainstorming and discussion", traits: [TRAITS.LEADERSHIP] },
      { text: "Thorough research and study", traits: [TRAITS.ANALYTICAL] },
      { text: "Intuition and quick decisions", traits: [TRAITS.STRATEGIC] }
    ]
  },
  {
    question: "Which of these best describes your personality?",
    options: [
      { text: "Analytical and detail-oriented", traits: [TRAITS.ANALYTICAL] },
      { text: "Creative and imaginative", traits: [TRAITS.CREATIVE] },
      { text: "Social and people-oriented", traits: [TRAITS.EMPATHETIC] },
      { text: "Adventurous and risk-taking", traits: [TRAITS.LEADERSHIP] },
      { text: "Organized and systematic", traits: [TRAITS.STRATEGIC] }
    ]
  },
  {
    question: "What type of impact do you want to make?",
    options: [
      { text: "Positive impact on society", traits: [TRAITS.EMPATHETIC] },
      { text: "Advance technology and innovation", traits: [TRAITS.TECHNICAL] },
      { text: "Contribute to economic growth", traits: [TRAITS.STRATEGIC] },
      { text: "Influence culture and arts", traits: [TRAITS.CREATIVE] },
      { text: "Protect the environment", traits: [TRAITS.PROBLEM_SOLVING] }
    ]
  }
];

const seedDB = async () => {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    await QuizQuestion.deleteMany();
    for (const question of quizQuestions) {
        await QuizQuestion.create(question);
    }
    console.log("✅ Questions seeded successfully");
    process.exit();
};

seedDB();