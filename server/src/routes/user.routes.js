import {Router} from "express";
import { forgetPassword, loginUser, logOutUser, refreshAccessToken, registerUser, updateProfile, updateUserAvatar } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1,
        }
    ]),
    registerUser
)
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJwt,logOutUser) 
router.route("/refresh-token").post(refreshAccessToken) 
router.route("/reset-password").post(forgetPassword) 
router.route("/update-profileInfo").post(updateProfile) 
router.route("/update-avatar").post(
    verifyJwt,
    upload.fields([
        {
            name:"avatar",
            maxCount:1,
        }
    ]),    
    updateUserAvatar
) 


export default router