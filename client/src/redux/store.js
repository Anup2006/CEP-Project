import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import adminReducer from "./adminSlice";
import careerReducer from "./careerSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer, 
        career: careerReducer,
    },
})