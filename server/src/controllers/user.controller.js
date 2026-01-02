import {asyncHandler} from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {apiResponse} from "../utils/apiResponse.js";
import { sendOTPEmail,generateOTP } from "../utils/otp.js";

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
    //console.log(req.body)
    const {email,password,username} = req.body

    if ([email,password,username].some((field)=> typeof field !== "string" || field?.trim()==="")){
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

    // let avatarLocalPath;
    // if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0 ){
    //     avatarLocalPath=req.files.avatar[0].path;
    // }

    // const avatar= await uploadOnCloudinary(avatarLocalPath)

    const otp=generateOTP();

    const user = await User.create({
        email,
        username:username.toLowerCase(),
        password,
        emailOTP: otp,
        emailOTPExpires: Date.now() + 10 * 60 * 1000, // 10 min
        isEmailVerified: false
    })

    await sendOTPEmail(email, otp);

    return res.status(201).json(
        new apiResponse(
        200,
        { userId: user._id },
        "OTP sent to email. Please verify."
        )   
    );
})

const resendOtp=asyncHandler(async(req,res)=>{
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) throw new apiError(404, "User not found");

    const otp = generateOTP();
    user.emailOTP = otp;
    user.emailOTPExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendOTPEmail(user.email, otp);

    res.status(200).json({
        success: true,
        message: "OTP resent successfully"
    });
})

const verifyEmailOtp= asyncHandler(async(req,res)=>{
    const {userId,otp}=req.body;
    const user = await User.findById(userId)

    if(!user){
        throw new apiError(404, "User not found");
    }
    
    if (user.emailOTP !== otp.toString()) {
        throw new apiError(400, "Invalid OTP");
    }

    if (user.emailOTPExpires < Date.now()) {
        throw new apiError(400, "OTP expired");
    }

    user.isEmailVerified = true;
    user.emailOTP = undefined;
    user.emailOTPExpires = undefined;

    await user.save();

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

    if (user.provider === "google") {
        throw new apiError(400, "This account uses Google login. Please login with Google.");
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

const getCurrentUser= asyncHandler(async(req,res)=>{
    return res.status(200)
    .json(new apiResponse(200,req.user,"Current User fetched successfully"))
})

const updateProfile = asyncHandler(async(req,res)=>{
    const {fullname,phoneNumber,grade,email}=req.body

    if(!fullname || !email || !phoneNumber || !grade){
        throw new apiError(400,"Fields are required");
    }

    const user =await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                fullname,
                email,
                phoneNumber,
                grade,
            }
        },
        {
            new:true,
        }
    )

    return res.status(200)
    .json(new apiResponse(200,user,"Accout details updated successfully"))
})

const updateUserAvatar = asyncHandler(async(req,res)=>{
    const avatarLocalPath=req.files?.avatar[0].path
    
    if(!avatarLocalPath){
        throw new apiError(400,"Avatar file is missing")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if(!avatar.url){
        throw new apiError(400,"Error while uploading on cloudinary")
    }

    const user= await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                avatar:avatar.url,
            }
        },
        {
            new:true,
        }
    )

    return res.status(200)
    .json(new apiResponse(200,{user:user},"User avatar is updated successfully"))
})

import axios from "axios";

const getGoogleUser = async (accessToken) => {
  const { data } = await axios.get(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
};


const googleLogin = asyncHandler(async(req,res)=>{
    const { token } = req.body;

  if (!token) {
    throw new apiError(400, "Google token is required");
  }

  const { sub, email, picture } = await getGoogleUser(token);

  let user = await User.findOne({ email });

  // ❌ No user → must signup
  if (!user) {
    throw new apiError(404, "User not found. Please sign up.");
  }

  // 🔗 LINK GOOGLE ACCOUNT (email user → google)
  if (!user.googleId) {
    user.googleId = sub;
    user.avatar = picture;
    user.provider = "google";
    await user.save({ validateBeforeSave: false });
  }

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "Google login successful"
      )
    );
})

const googleSignUp = asyncHandler(async(req,res)=>{
    const { token } = req.body;

    if (!token) {
        throw new apiError(400, "Google token is required");
    }

    const { sub, email, name, picture } = await getGoogleUser(token);

    // Check if user already exists
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new apiError(409, "User already exists. Please login.");
    }

    // Create user
    const user = await User.create({
        fullname: name,
        email,
        googleId: sub,
        avatar: picture,
        provider: "google",
        username: email.split("@")[0], // auto username
    });

    const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
        new apiResponse(
            200,
            { user: loggedInUser, accessToken, refreshToken },
            "Google signup successful"
        )
    );
})

export {
    registerUser,
    loginUser,
    logOutUser,
    refreshAccessToken,
    forgetPassword,
    getCurrentUser,
    updateProfile,
    updateUserAvatar,
    googleLogin,
    googleSignUp,
    verifyEmailOtp,
    resendOtp,
}