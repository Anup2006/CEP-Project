import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authSlice } from "./authSlice";
axios.defaults.withCredentials = true;
const base_uri=import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";
const BACKEND_URL=`${base_uri}/admin`;

const fetchAllUsers = createAsyncThunk(
    "admin/fetchAllUsers",
     async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/users`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const fetchAdminStats = createAsyncThunk(
    "admin/fetchAdminStats",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/stats`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async (userId, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`${BACKEND_URL}/user/${userId}`);
            return { userId, message: res.data.message };
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const updateUserRole = createAsyncThunk(
    "admin/updateUserRole", 
    async ({ userId, role }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${BACKEND_URL}/user/${userId}/role`, { role });
            return response.data; 
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const initialState ={
    users: [],
    stats: { totalUsers: 0, students: 0, mentors: 0 },
    loading: false,
    error: null,
}

const adminSlice =createSlice({
    name : 'admin ',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        //fetch all users
        .addCase(fetchAllUsers.pending, state => {
        state.loading = true;
        state.error = null;
        })
        .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.error=null;
        })
        .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error=action.payload?.message ||
            action.payload?.error ||
            "Login failed";
        })

        // Fetch stats
        .addCase(fetchAdminStats.pending, state => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAdminStats.fulfilled, (state, action) => {
            state.loading = false;
            state.stats = action.payload.data;
            state.error=null;
        })
        .addCase(fetchAdminStats.rejected, (state, action) => {
            state.loading = false;
            state.error=action.payload?.message ||
                action.payload?.error ||
                "Login failed";
        })

        
    // Delete user
    .addCase(deleteUser.fulfilled, (state, action) => {
      const deletedUserId = action.payload.userId; 
      state.users = state.users.filter(u => u._id !== deletedUserId);
    })

    // Update role
    .addCase(updateUserRole.fulfilled, (state, action) => {
      const updatedUser = action.payload.data;
      state.users = state.users.map(u => (u._id === updatedUser._id ? updatedUser : u));
    })
    }
})

export const {} = authSlice.actions;
export {fetchAllUsers,fetchAdminStats,deleteUser,updateUserRole};
export default adminSlice.reducer;
