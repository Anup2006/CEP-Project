import { GoogleGenerativeAI } from "@google/generative-ai";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI?.trim());

const aiCareerChat = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message) {
    throw new apiError(400, "Message is required");
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are an AI career guidance assistant.
              Give concise, practical, student-friendly advice.

              User question: ${message}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
      }
    });

    // 3) Pull AI text from the response
    const reply = result.response?.text() || result.response?.candidates?.[0]?.output || "";
    if (!reply) {
      throw new apiError(500, "Failed to generate AI response");
    }

    return res.status(200).json(
      new apiResponse(200, { reply }, "AI career response generated successfully")
    );

  } catch (error) {
    console.error("AI error:", error);

    if (error?.code === 429) {
      return res.status(429).json(
        new apiResponse(429, null, "Free usage limit reached. Please try again later.")
      );
    }

    return res.status(500).json(
      new apiResponse(500, null, "Failed to generate AI response. Please try again.")
    );
  }
});

export { aiCareerChat };
