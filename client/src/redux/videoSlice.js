import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials = true;
const base_uri=import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";
const BACKEND_URL=`${base_uri}/materials`;

const fetchAllVideos = createAsyncThunk(
  "videos/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/videos`);
      return res.data; // 👈 apiResponse
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const searchYoutubeVideos = createAsyncThunk(
  "videos/search",
  async (query, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/videos/search`, {
        params: { q: query },
    });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const addVideoByAdmin = createAsyncThunk(
  "videos/addVideoByAdmin",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/videos/create-video`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const deleteVideo = createAsyncThunk(
  "videos/delete",
  async ({ videoId, token }, { rejectWithValue }) => {
    try {
      console.log(videoId)
      await axios.delete(`${BACKEND_URL}/videos/${videoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return videoId;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const initialState = {
    videos: [],
    loading: false,
    error: null
}

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    clearVideos(state) {
      state.videos = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all videos
      .addCase(fetchAllVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload.data;
      })
      .addCase(fetchAllVideos.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch videos";
      })

      // Search videos
      .addCase(searchYoutubeVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchYoutubeVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload.data;
      })
      .addCase(searchYoutubeVideos.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "YouTube search failed";
      })

      //Add videos by admin
      .addCase(addVideoByAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVideoByAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.videos.unshift(action.payload.data);
      })
      .addCase(addVideoByAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to add video";
      })

      // delete
      .addCase(deleteVideo.fulfilled, (state, action) => {
          state.videos = state.videos.filter(
              (w) => w._id !== action.payload
          );
      });
  },
});

export const { clearVideos } = videoSlice.actions;
export {fetchAllVideos,searchYoutubeVideos,addVideoByAdmin,deleteVideo}
export default videoSlice.reducer;
