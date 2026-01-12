import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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
import adminRouter from "./routes/admin.routes.js"
import resourceRouter from "./routes/resource.routes.js"

//router declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/careers", careerRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/materials", resourceRouter);

export {app}