import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const base_uri=import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";
const BACKEND_URL=`${base_uri}/materials`;

const sendMessageToAI = createAsyncThunk(
  "chat/sendMessage",
  async ({message,token}, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/chatbot`,  {message},
        {
            headers: {
                Authorization: `Bearer ${token}`, 
                "Content-Type": "application/json",
            },
        }
      );
      return res.data.data.reply;
    } catch (err) {
      if (err.response?.status === 429) {
        return rejectWithValue({ message: "⚠️ Free usage limit reached. Please try again.", quota: true });
      }
      return rejectWithValue({ message: "⚠️ Something went wrong. Please try again.", quota: false });
    }
  }
);

const initialState = {
  messages: [
    {
      sender: "bot",
      text: "Hi 👋 I’m your AI Career Assistant. Ask me anything about careers, skills, or future paths."
    }
  ],
  loading: false,
  quotaReached: false
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUserMessage(state, action) {
      state.messages.push({ sender: "user", text: action.payload });
    },
    clearChat(state) {
      state.messages = [];
      state.quotaReached = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageToAI.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessageToAI.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({ sender: "bot", text: action.payload });
      })
      .addCase(sendMessageToAI.rejected, (state, action) => {
        state.loading = false;
        const errorMessage = action.payload?.message || action.error?.message || "⚠️ Something went wrong";

        state.messages.push({ sender: "bot", text: errorMessage });

        
        if (action.payload?.quota) state.quotaReached = true;
      });
  }
});

export const { addUserMessage, clearChat } = chatSlice.actions;
export {sendMessageToAI};
export default chatSlice.reducer;
