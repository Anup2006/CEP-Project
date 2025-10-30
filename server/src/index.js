import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js";

dotenv.config({
    path: "./.env"
});

connectDB()
.then(()=>{
    console.log("MONGODB CONNECTED SUCCESSFULLY");
    app.on("error",(error)=>{
        console.log("ERROR : ", error)
        throw error
    })
    app.listen(process.env.PORT||5000,()=>{
        console.log(`SERVER IS RUNNING AT PORT ${process.env.PORT||5000}`);
    })
})
.catch(error=>{
    console.log("MONGODB CONNECTION FAILED:", error)
})