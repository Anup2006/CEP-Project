import {asyncHandler} from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {apiResponse} from "../utils/apiResponse.js";

const generateAccessAndRefreshTokens=async(userId)=>{
    try {
        const user=await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken=refreshToken
        await user.save({ validateBeforeSave:false })

        return {accessToken,refreshToken}
    }catch(error){
    throw new apiError(500,"Something went wrong while generating refresh and access tokens")
    }
}

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


    //console.log(req.body)
    const {email,fullname,password,username,grade} = req.body

    if ([fullname,email,password,username,grade].some((field)=> field?.trim()==="")){
        throw new apiError(400,"All fields are required!!")
    }

    const existedUser = await User.findOne({
        $or:[{email},{username}]
    })
    if(existedUser){
        throw new apiError(409,"User with email or username already exists")
    }

    //console.log(req.files)
    // const avatarLocalPath=req.files?.avatar[0]?.path; 

    let avatarLocalPath;
    if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0 ){
        avatarLocalPath=req.files.avatar[0].path;
    }

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

    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const options={
        httpOnly:true,
        secure:true,
    }

    return res.status(201)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new apiResponse(
            200,
            {
                user:createdUser,accessToken,refreshToken
            },
            "User registered sucessfully") 
    )
})

const loginUser=asyncHandler(async(req,res)=>{
    const {email,username,password}=req.body

    if(!(username || email)){
        throw new apiError(400,"Username or email is required")
    }

    const user = await User.findOne({
        $or:[{username},{email}]
    })
    if(!user){
        throw new apiError(404,"User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(String(password))
    if(!isPasswordValid){
        throw new apiError(401,"Invalid user credentials")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options={
        httpOnly:true,
        secure:true,
    }

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new apiResponse(
            200,
            {
                user:loggedInUser,accessToken,refreshToken
            },
            "User Logged In Successfully"
        )
    )

})

const logOutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new:true
        }
    )
    
    const options={
        httpOnly:true,
        secure:true,
    }
    
    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new apiResponse(200,{},"User Logged Out Successfully"))
    
})

const refreshAccessToken=asyncHandler(async(req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken){
        throw new apiError(401,"Unauthorized access")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id)
        if(!user){
            throw new apiError(401,"Invalid rfresh token")
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new apiError("401","Refresh token expired or used")
        }
    
        const options={
            httpOnly:true,
            secure:false,
        }
    
        const {accessToken,newRefreshToken}=await generateAccessAndRefreshTokens(user._id) 
    
        return res.status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",newRefreshToken,options)
        .json(new apiResponse(200,{accessToken,refreshToken:newRefreshToken},"Access token refreshed"))
    } catch (error) {
        throw new apiError(401,"Invalid refresh token")
    }

})

const forgetPassword=asyncHandler(async(req,res)=>{
    const {email,newPassword,confPassword}=req.body
    
    if([email,newPassword,confPassword].some((field)=> field?.trim()==="")){
        throw new apiError(400,"All fields are required!!")
    }

    if(!(newPassword === confPassword)){
        throw new apiError(400,"Confirm Password doesn't match ")
    }

    const user=await User.findOne({email})

    if(!user){
        throw new apiError(404,"User with this email id does not exists")
    }
    
    user.password=newPassword
    await user.save({validateBeforeSave:false})

    return res.status(201)
    .json(
        new apiResponse(
            200,
            {},
            "Password reset Successfully"
        )
    )
})
export {
    registerUser,
    loginUser,
    logOutUser,
    refreshAccessToken,
    forgetPassword
}