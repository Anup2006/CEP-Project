import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error.middleware.js";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))


app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))

app.use(cookieParser())


//router import 
import userRouter from "./routes/user.routes.js"
import careerRouter from "./routes/career.routes.js"

//router declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/careers", careerRouter);

app.use(errorHandler);


export {app}