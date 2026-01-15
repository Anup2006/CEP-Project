import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import adminReducer from "./adminSlice";
import careerReducer from "./careerSlice";
import videoReducer from "./videoSlice";
import quizReducer from "./quizSlice";
import webinarReducer from "./webinarSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer, 
        career: careerReducer,
        quiz: quizReducer,
        videos: videoReducer,
        webinars: webinarReducer,
    },
})