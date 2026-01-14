import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const base_uri = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";
const BACKEND_URL = `${base_uri}/career-quiz`;

const fetchQuizQuestions = createAsyncThunk(
  "quiz/fetchQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/questions`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const submitQuizAnswers = createAsyncThunk(
  "quiz/submitAnswers",
  async (answers, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/submit`, { answers });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  questions: [],
  answers: {},
  result: null,
  loading: false,
  error: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setAnswer(state, action) {
      const { questionIndex, value } = action.payload;
      state.answers[questionIndex] = value;
    },
    clearQuiz(state) {
      state.answers = {};
      state.result = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Questions
      .addCase(fetchQuizQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload.data || [];
        state.error = null;
      })
      .addCase(fetchQuizQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.payload?.error || "Error fetching quiz questions";
      })

      // Submit Answers
      .addCase(submitQuizAnswers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitQuizAnswers.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload.data;
        state.error = null;
      })
      .addCase(submitQuizAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.payload?.error || "Error submitting quiz answers";
      });
  },
});

export const { setAnswer, clearQuiz } = quizSlice.actions;
export { fetchQuizQuestions, submitQuizAnswers };
export default quizSlice.reducer;
