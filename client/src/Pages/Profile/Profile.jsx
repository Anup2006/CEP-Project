import { useSelector } from "react-redux";
import { useState } from "react";
import {Edit} from "lucide-react"
import { useNavigate } from "react-router";

export default function Profile(){
    const {user,token} = useSelector(state=>state.auth);

    const navigate = useNavigate();
    const updateProfile=async()=>{
        console.log("hi")
        navigate("/app/update-profile")
    }
    return(
        <>
            <div className=" relative flex p-80 items-center justify-center h-screen bg-gray-100  pl-60 pr-60 ">
                <div className="flex flex-col md:flex-row bg-blue-100 shadow-xl w-full items-center justify-evenly rounded-3xl">
                    <div className="flex flex-col w-full pt-5 pb-5 rounded-l-2xl justify-center items-center text-center ">
                        <div className="pt-10 p-15 w-full">
                            <div className="flex justify-center w-full z=50  mb-10 ">
                                <span className="flex gap-1 justify-center">
                                    <img 
                                        src={user?.avatar}
                                        alt="Profile Pic" 
                                        className="z=50 w-40 h-40 rounded-full"
                                        />
                                </span>
                            </div>
                            <div className="flex flex-row gap-5 mb-6 ">
                                <div className="flex w-full flex-col gap-2">
                                    <label htmlFor="name" className="form-label">
                                        <span className="flex gap-1 justify-center">
                                            Full Name
                                        </span>
                                    </label>
                                    <div className="flex items-center bg-white border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                        {user?.fullname}
                                    </div>
                                </div>
                                <div className="flex flex-col w-full gap-2">
                                    <label htmlFor="email" className="form-label">
                                        <span className="flex gap-1 justify-center">
                                            Email Address
                                        </span>
                                    </label>
                                    <div className="flex items-center bg-white border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                        {user?.email}
                                    </div>
                                </div>
                            </div>

                            <div className="flex mb-6 flex-row gap-5">
                                <div className="flex w-full flex-col gap-2">
                                    <label htmlFor="phone" className="form-label">
                                        <span className="flex gap-1 justify-center">
                                            Phone Number 
                                        </span>
                                    </label>
                                    <div className="flex items-center bg-white border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                        +91 {user?.phoneNumber}
                                    </div>
                                </div>
                                <div className="flex w-full flex-col gap-2">
                                    <label htmlFor="class" className="form-label">
                                        <span className="flex gap-1 justify-center">
                                            Grade                                          
                                        </span>
                                    </label>
                                    <div className="flex items-center bg-white border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                        {user?.grade}
                                    </div>
                                </div>
                            </div>

                            <div className="flex mb-6 flex-col gap-2">
                                <label htmlFor="address" className="form-label">
                                    <span className="flex gap-1 justify-center">
                                        Address
                                    </span>
                                </label>
                                <div className="flex items-center bg-white border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                    Your Address
                                </div>
                            </div>

                            <button
                                onClick={updateProfile}
                                className="submit-button w-full"
                            >
                                <span className="flex flex-row gap-2">
                                    <Edit/> Edit 
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}