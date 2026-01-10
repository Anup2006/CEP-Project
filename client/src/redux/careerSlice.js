import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials = true;
const base_uri=import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";
const BACKEND_URL=`${base_uri}/careers`;

const fetchCareers = createAsyncThunk(
  "career/fetchCareers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BACKEND_URL}`);
      return res.data; 
    } catch (err) {
       return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const fetchCareerBySlug = createAsyncThunk(
  "career/fetchCareerBySlug",
  async (slug,{ rejectWithValue } ) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/${slug}`);
      return res.data; 
    } catch (err) {
       return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const createCareer = createAsyncThunk(
  "career/createCareer",
  async (careerData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/create-career`,careerData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to create career" }
      );
    }
  }
);

const updateCareer = createAsyncThunk(
  "career/updateCareer",
  async({careerId,updatedData},{rejectWithValue})=>{
    try {      
      const res=await axios.patch(`${BACKEND_URL}/update-career/${careerId}`,updatedData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update career" }
      );
    }
  }
)

const deleteCareer= createAsyncThunk(
  "career/deleteCareer",
  async(careerId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${BACKEND_URL}/${careerId}`);
      return { careerId, message: res.data.message };
    } catch (err) {
        return rejectWithValue(err.response?.data || "Failed to create career");
    }
  }
)
const initialState = {
    careers: [],
    selectedCareer: null,
    loading: false,
    error: null
}

export const careerSlice = createSlice({
  name: 'career',
  initialState,
  reducers: {
    clearSelectedCareer(state) {
      state.selectedCareer = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetch all careers
      .addCase(fetchCareers.pending, (state) => {
        state.loading = true;
        state.error=null;
      })
      .addCase(fetchCareers.fulfilled, (state, action) => {
        state.loading = false;
        state.careers= action.payload.data;
        state.error=null;
      })
      .addCase(fetchCareers.rejected, (state, action) => {
        state.loading = false;
        state.error=action.payload?.message ||
            action.payload?.error ||
            "Erorr while fetching careers";
      })

      // fetch career by slug
      .addCase(fetchCareerBySlug.pending, (state) => {
        state.loading = true;
        state.error=null;
      })
      .addCase(fetchCareerBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCareer = action.payload.data;
        state.error=null;
      })
      .addCase(fetchCareerBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error=action.payload?.message ||
            action.payload?.error ||
            "Erorr while loading career";
      })

      //Create career
      .addCase(createCareer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCareer.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.careers.push(action.payload.data); // 👈 push new career
      })
      .addCase(createCareer.rejected, (state, action) => {
        state.loading = false;
        state.error=action.payload?.message ||
                action.payload?.error ||
                "Career creation failed";
      })

      // Delete career
      .addCase(deleteCareer.fulfilled, (state, action) => {
        const deletedCareerId = action.payload.careerId; 
        state.careers = state.careers.filter(u => u._id !== deletedCareerId);
      })

      // Update role
      .addCase(updateCareer.fulfilled, (state, action) => {
        const updatedCareer = action.payload.data;
        state.careers = state.careers.map(c => (c._id === updatedCareer._id ? updatedCareer : c));
      })
  }
});

export const { clearSelectedCareer } = careerSlice.actions;
export {fetchCareers,fetchCareerBySlug,createCareer,deleteCareer,updateCareer};
export default careerSlice.reducer;