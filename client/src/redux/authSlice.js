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
    async({email,username,fullname,grade,avatar,password},{rejectWithValue})=>{
        try {
            const formData = new FormData();
            formData.append("email",email);
            formData.append("username", username);
            formData.append("fullname", fullname);
            formData.append("grade", grade);
            formData.append("password", password);

            if(avatar){
                formData.append("avatar",avatar);
            }
            const response = await axios.post(`${BACKEND_URL}/register`,
                formData,
                {headers:{"Content-Type":"multipart/form-data"}}
            );
            console.log(response.data);
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
    }
}) 

export const {} = authSlice.actions;
export {loginUser,signupUser,logoutUser};
export default authSlice.reducer;