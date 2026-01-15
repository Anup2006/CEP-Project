import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials = true;
const base_uri=import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";
const BACKEND_URL=`${base_uri}/materials`;

const fetchWebinars = createAsyncThunk(
  "webinars/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/webinars`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const registerWebinar = createAsyncThunk(
  "webinars/register",
  async ({ webinarId, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/webinars/${webinarId}/register`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return webinarId;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const deleteWebinar = createAsyncThunk(
  "webinars/delete",
  async ({ webinarId, token }, { rejectWithValue }) => {
    try {
      await axios.delete(`${BACKEND_URL}/webinars/${webinarId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return webinarId;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const fetchWebinarById = createAsyncThunk(
  "webinars/fetchById",
  async ({ webinarId, token }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/webinar/${webinarId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const createWebinar = createAsyncThunk(
  "webinars/create",
  async ({ webinarData, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/create-webinar`,
        webinarData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create webinar");
    }
  }
);

const addRecording = createAsyncThunk(
  "webinars/addRecording",
  async ({ webinarId, recordingUrl, token }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${BACKEND_URL}/webinars/${webinarId}/recording`,
        { recordingUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add recording");
    }
  }
);

const webinarSlice = createSlice({
  name: "webinars",
  initialState: {
    webinars: [],
    webinar:null,
    loading: false,
    error: null,
  },
  reducers: {
    clearWebinar: (state) => {
      state.webinar = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
        //fetch 
        .addCase(fetchWebinars.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchWebinars.fulfilled, (state, action) => {
            state.loading = false;
            state.webinars = action.payload;
        })
        .addCase(fetchWebinars.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Register webinar
        .addCase(registerWebinar.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerWebinar.fulfilled, (state, action) => {
            state.loading = false;

            const webinar = state.webinars.find((w) => w._id === action.payload.webinarId);

            if (webinar) {
                if (!webinar.registeredUsers) webinar.registeredUsers = [];
                webinar.registeredUsers.push(action.payload.userId); 
            }
        })
        .addCase(registerWebinar.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // delete
        .addCase(deleteWebinar.fulfilled, (state, action) => {
            state.webinars = state.webinars.filter(
                (w) => w._id !== action.payload
            );
        })

        // get webinar info by id (single webinar)
        .addCase(fetchWebinarById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchWebinarById.fulfilled, (state, action) => {
            state.loading = false;
            state.webinar = action.payload; 
        })
        .addCase(fetchWebinarById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //create  
        .addCase(createWebinar.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createWebinar.fulfilled, (state, action) => {
          state.loading = false;
          state.webinars.unshift(action.payload); 
        })
        .addCase(createWebinar.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        // Add Recording
        .addCase(addRecording.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addRecording.fulfilled, (state, action) => {
          state.loading = false;

          // update webinar in the list
          const index = state.webinars.findIndex(w => w._id === action.payload._id);
          if (index !== -1) state.webinars[index] = action.payload;

          // update selected webinar if opened
          if (state.webinar?._id === action.payload._id) {
            state.webinar = action.payload;
          }
        })
        .addCase(addRecording.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  },
});

export const {clearWebinar} = webinarSlice.actions;
export {fetchWebinars,registerWebinar,deleteWebinar,fetchWebinarById,createWebinar,addRecording}
export default webinarSlice.reducer;