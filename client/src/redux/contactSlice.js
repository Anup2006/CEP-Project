import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const base_uri = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";
const BACKEND_URL = `${base_uri}/contact`;

const sendContactMessage = createAsyncThunk(
  "contact/send",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/send`, formData);
      console.log(res.data.data)
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send message"
      );
    }
  }
);

const fetchUnreadMessages = createAsyncThunk(
  "contact/fetchUnread",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/unread`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch unread messages"
      );
    }
  }
);

const markMessageAsRead = createAsyncThunk(
  "contact/markRead",
  async ({ messageId, token }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${BACKEND_URL}/${messageId}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return res.data.data; // updated message
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark message as read"
      );
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    success: false,
    error: null,
    unreadMessages: [],
  },
  reducers: {
    resetContactState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
        //send 
        .addCase(sendContactMessage.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(sendContactMessage.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
        })
        .addCase(sendContactMessage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Message send failed";
        })

        //fetch 
        .addCase(fetchUnreadMessages.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchUnreadMessages.fulfilled, (state, action) => {
            state.loading = false;
            state.unreadMessages = action.payload;
        })
        .addCase(fetchUnreadMessages.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Message fetch failed";
        })

        //mark read 
        .addCase(markMessageAsRead.fulfilled, (state, action) => {
            state.unreadMessages = state.unreadMessages.filter(
            (msg) => msg._id !== action.payload._id
            );
        })
        .addCase(markMessageAsRead.rejected, (state, action) => {
            state.error = action.payload?.message || "Mark message failed"
        });

  }
});

export const { resetContactState } = contactSlice.actions;
export {sendContactMessage,markMessageAsRead,fetchUnreadMessages}
export default contactSlice.reducer;
