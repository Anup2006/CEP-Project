import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials = true;
const base_uri=import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";
const BACKEND_URL=`${base_uri}/users`;

const loginUser=createAsyncThunk(
    "auth/loginUser",
    async({email,password},{rejectWithValue})=>{
        try {
            const response = await axios.post(`${BACKEND_URL}/login`,{email,password});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const signupUser=createAsyncThunk(
    "auth/signUpUser",
    async({email,username,password},{rejectWithValue})=>{
        try {
            const response = await axios.post(`${BACKEND_URL}/register`,{email,password,username});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data); //sends your backend error message to the frontend
        }
    }
)

const logoutUser=createAsyncThunk(
    "auth/logoutUser",
    async(_, {getState,rejectWithValue})=>{
        try{
            const token=getState().auth.token;
            const response =await axios.post(`${BACKEND_URL}/logout`,{},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            return response.data;
        }
        catch(error){
            return rejectWithValue(error.response.data)
        }
    }
)

const updateAvatar=createAsyncThunk(
    "/update-profile",
    async({avatar},{rejectWithValue})=>{
        try {
            const formData = new FormData();
            formData.append("avatar", avatar);
            const response = await axios.post(`${BACKEND_URL}/update-avatar`,
                formData,
                {
                    headers:{ "Content-Type" : "multipart/form-data"}
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data || "Avatar Upload Failed")
        }
    }
)

const googleLoginUser = createAsyncThunk(
  "auth/googleLoginUser",
  async ({ token, isSignup }, { rejectWithValue }) => {
    try {
      const endpoint = isSignup ? "googleSignup" : "googleLogin";
      const res = await axios.post(`${BACKEND_URL}/${endpoint}`, { token }, { withCredentials: true });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Google auth failed");
    }
  }
);


const initialState = {
    user:JSON.parse(localStorage.getItem("user")) || null,
    token:localStorage.getItem("token") || null,
    loading:false,
    error:null,
}

export const authSlice = createSlice({
    name: 'auth', 
    initialState,
    extraReducers: (builder)=>{
        builder
        //login
        .addCase(loginUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload.data.user;
            state.token=action.payload.data.accessToken;
            state.error=null;
            // console.log("Login successful:", state.user);
            // console.log("Login successful:", state.token);

            localStorage.setItem("token",action.payload.data.accessToken);
            localStorage.setItem("user",JSON.stringify(action.payload.data.user));
        })
        .addCase(loginUser.rejected,(state)=>{
            state.loading=false;
            state.error=action.payload?.message ||
            action.payload?.error ||
            "Login failed";
        })

        //signup
        .addCase(signupUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(signupUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload.data.user;
            state.token=action.payload.data.accessToken;
            state.error=null;

            localStorage.setItem("token",action.payload.data.accessToken);
            localStorage.setItem("user",JSON.stringify(action.payload.data.user));
        })
        .addCase(signupUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message ||
            action.payload?.error ||
            "Sign Up failed";
        })

        // Google login/signup
        .addCase(googleLoginUser.pending, (state) => { 
            state.loading = true; 
            state.error = null 
        })
        .addCase(googleLoginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data.user;
            state.token=action.payload.data.accessToken;
            state.error=null;

            localStorage.setItem("token",action.payload.data.accessToken);
            localStorage.setItem("user",JSON.stringify(action.payload.data.user));
        })
        .addCase(googleLoginUser.rejected, (state, action) => { 
            state.loading = false; 
            state.error=action.payload?.message ||
            action.payload?.error ||
            "Sign Up failed";
        })


        //logout
        .addCase(logoutUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(logoutUser.fulfilled,(state)=>{
            state.loading=false;
            state.user=null;
            state.token=null;
            state.error=null;
            
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        })
        .addCase(logoutUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message ||
            action.payload?.error ||
            "Logout failed";
        })

        //update Avatar
        .addCase(updateAvatar.pending,(state,action)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(updateAvatar.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload?.data.user;
            state.error=null;

            localStorage.setItem("user",JSON.stringify(action.payload.data.user));
        })
        .addCase(updateAvatar.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message ||
            action.payload?.error ||
            "Avatar Update failed";
        })
    }
}) 

export const {} = authSlice.actions;
export {loginUser,signupUser,logoutUser,updateAvatar, googleLoginUser};
export default authSlice.reducer;