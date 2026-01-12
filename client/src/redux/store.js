import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import adminReducer from "./adminSlice";
import careerReducer from "./careerSlice";
import videoReducer from "./videoSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer, 
        career: careerReducer,
        videos: videoReducer,
    },
})