import {Lock,Mail} from "lucide-react";
import {useState} from "react";
import { replace, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "sonner";
const base_uri=import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";
const BACKEND_URL=`${base_uri}/users`;

export default function ForgetPassword(){
    const[email,setEmail]=useState("")
    const[newPassword,setNewPassword]=useState("")
    const[confPassword,setConfPassword]=useState("")

    const navigate=useNavigate()
    const handleChange=(async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.post(`${BACKEND_URL}/reset-password`,{
                email,newPassword,confPassword
            }) 
            if(response.data.success){
                toast.success(response.data.message)
                navigate("/auth",{replace:true})

            }
        } catch (error) {
            toast.error("Reset Failed!!")
        }


    })

    return(
        <>
            <div className=" relative flex p-80 items-center justify-center h-screen bg-gray-100  pl-60 pr-60 ">
                <div className="flex flex-col md:flex-row bg-blue-100 shadow-xl w-full items-center justify-evenly rounded-3xl">
                    <div className="flex w-full p-5 justify-center bg-white shadow-xl items-center rounded-r-2xl" >
                        <div className=" w-full p-6 rounded-xl shadow-xl">
                            <form onSubmit={handleChange} className="space-y-4">
                                <div className="space-y-1">
                                    <label
                                        htmlFor="login-email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email
                                    </label>
                                    <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                        <input
                                            id="login-email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            className="flex-1 ml-3 outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label
                                        htmlFor="new-password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        New Password
                                    </label>
                                    <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                        <input
                                            id="new-password"
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="flex-1 ml-3 outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label
                                        htmlFor="conf-password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Confirm Password
                                    </label>
                                    <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                        <input
                                            id="conf-password"
                                            type="password"
                                            value={confPassword}
                                            onChange={(e) => setConfPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="flex-1 ml-3 outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-black hover:bg-gray-200  hover:text-black text-white p-2 rounded-md disabled:opacity-50 transition-all"
                                >
                                    Reset
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}