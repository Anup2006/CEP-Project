import {asyncHandler} from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {apiResponse} from "../utils/apiResponse.js";

const registerUser= asyncHandler( async (req,res)=>{
    //get user details from frontend 
    //validation 
    //check if user already exists by username and email
    //check for avatar
    //upload them on cloudinary and check 
    //create user object - create entry in db 
    //remove password and refresh token field from response
    //check for user creation 
    //return res 

    const {fullname,email,password,username} = req.body

    if ([fullname,email,password,grade,username].some((field)=> field?.trim()==="")){
        throw new apiError(400,"All fields are required!!")
    }

    const existedUser = User.findOne({
        $or:[{email},{username}]
    })
    if(existedUser){
        throw new apiError(409,"User with email or username already exists")
    }

    const avatarLocalPath=req.files?.avatar[0]?.path; 
    const avatar= await uploadOnCloudinary(avatarLocalPath)

    const user = await User.create({
        fullname,
        email,
        username:username.toLowerCase(),
        grade,
        password,
        avatar: avatar?.url || " ",
    })

    const createdUser =  await User.findById(user._id).select(
        "-password -refreshToken"
    ) 

    if(!createdUser){
        throw new apiError(500,"something went wrong while registering user")
    }

    return res.status(201).json(
        new apiResponse(200,createdUser,"User registered sucessfully") 
    )
})

export {registerUser}