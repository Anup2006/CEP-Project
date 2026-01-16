import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials = true;
const base_uri=import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";
const BACKEND_URL=`${base_uri}/materials`;

const fetchStudyMaterials = createAsyncThunk(
  "materials/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/study-materials`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const createStudyMaterial = createAsyncThunk(
  "studyMaterials/create",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/create-study-material`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const deleteStudyMaterial = createAsyncThunk(
  "studyMaterials/delete",
  async ({ materialId, token }, { rejectWithValue }) => {
    try {
      await axios.delete(`${BACKEND_URL}/study-material/${materialId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return materialId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const studyMaterialSlice = createSlice({
  name: "materials",
  initialState: {
    materials: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
        //fetch
        .addCase(fetchStudyMaterials.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchStudyMaterials.fulfilled, (state, action) => {
            state.loading = false;
            state.materials = action.payload;
        })
        .addCase(fetchStudyMaterials.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // create
        .addCase(createStudyMaterial.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createStudyMaterial.fulfilled, (state, action) => {
            state.materials.unshift(action.payload);
            state.loading = false;
            state.error = null;
        })

        // delete
        .addCase(deleteStudyMaterial.fulfilled, (state, action) => {
            state.materials = state.materials.filter(
            (m) => m._id !== action.payload
            );
        });
  },
});

export const {} = studyMaterialSlice.actions;
export {fetchStudyMaterials,deleteStudyMaterial,createStudyMaterial}
export default studyMaterialSlice.reducer;