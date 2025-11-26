import { GraduationCap,Mail,Phone,Lock,User} from "lucide-react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import GoogleButton from "./GoogleButton.jsx";
import PhoneButton from "./PhoneButton.jsx";
import {toast} from "sonner";
import {useDispatch,useSelector} from 'react-redux';
import {loginUser} from '../../redux/authSlice.js';


export default function AuthForm(){
    const [activeTab, setActiveTab] = useState("login");
    const [loginMethod, setLoginMethod] = useState("email");
    const [next,setNext]=useState(false);
    const {token,loading, error} = useSelector((state)=>state.auth);

    // Login form state        
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPhone, setLoginPhone] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Signup form state
    const [username, setusername] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const identifier = loginMethod === "email" ? loginEmail : loginPhone;
        const fieldName = loginMethod === "email" ? "email" : "phone";
        if (!identifier || !loginPassword) {
            toast.error(`Please enter your ${fieldName} and password`);
            return;
        }
        dispatch(loginUser({email:identifier,password:loginPassword}))

    }
    useEffect(() => {
        if (token) {
        navigate("/app", { replace: true });
        }
    }, [token, navigate]);

    const handleNext = async (e) => {
        e.preventDefault();
        if (!username || !signupEmail || !signupPassword)
        return toast.error("Please fill all fields");
        
        setNext(true)
    }
    useEffect(()=>{
        if(next){
            const data = { username, signupEmail,signupPassword}; // your form data
            navigate("/auth/signupDetails", { state: data , replace :true});
        }
    },[next,navigate])

    return (
        <>
            <div className=" relative flex p-80 items-center justify-center h-screen bg-gray-100  pl-60 pr-60 ">
                <div className="flex flex-col md:flex-row bg-blue-100 shadow-xl w-full items-center justify-evenly rounded-3xl">
                    <div className="flex flex-col w-full p-5 rounded-l-2xl justify-center items-center text-center ">
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                            <GraduationCap className="w-50 h-50" />
                        </motion.div>
                        <h1 className="text-5xl font-extrabold mb-4">CareerCampus</h1>
                        <p>Career Orientation on Youth</p>
                    </div>
                    <div className="flex w-full p-5 justify-center bg-white shadow-xl items-center rounded-r-2xl" >
                        <div className=" w-full p-6 rounded-xl shadow-xl">
                            <div className="text-center mb-6">
                                <h1 className="text-2xl font-bold">CareerCampus</h1>
                                <p className="text-gray-500">abc</p>
                            </div>
                            <div className="flex mb-6 rounded-lg bg-gray-100">
                                <button
                                    onClick={() => setActiveTab("login")}
                                    className={`flex-1 py-2 px-4 transition-all 
                                    ${activeTab === "login"? "bg-white shadow-sm":"text-gray-600 hover:text-gray-900"}`}
                                    >Login
                                </button>
                                <button
                                    onClick={() => setActiveTab("signup")}
                                    className={`flex-1 py-2 px-4 transition-all 
                                    ${activeTab === "signup"? "bg-white shadow-sm": "text-gray-600 hover:text-gray-900"}`}
                                    >Sign Up
                                </button>
                            </div>
                            <AnimatePresence mode="wait">
                                {activeTab === "login" && (        
                                    <motion.div 
                                        key="login-tab"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <GoogleButton/>
                                        <PhoneButton/>
                                        <div className="relative my-6">
                                            <hr />
                                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500">
                                                or
                                            </span>
                                        </div>
                                        {/* Login Method Toggle */}
                                        <div className="flex gap-2 mb-4 p-1 bg-gray-100 rounded-lg">
                                            <button
                                                onClick={() => setLoginMethod("email")}
                                                className={`flex-1 py-2 px-4 rounded-md transition-all 
                                                ${loginMethod === "email"? "bg-white shadow-sm":"text-gray-600 hover:text-gray-900"}`}
                                            >
                                                <Mail className="w-4 h-4 inline mr-2" /> Email
                                            </button>
                                            <button
                                                onClick={() => setLoginMethod("phone")}
                                                className={`flex-1 py-2 px-4 rounded-md transition-all
                                                ${loginMethod === "phone"? "bg-white shadow-sm":"text-gray-600 hover:text-gray-900"}`}
                                            >
                                                <Phone className="w-4 h-4 inline mr-2" /> Phone
                                            </button>
                                        </div>
                                        <form onSubmit={handleLogin} className="space-y-4">
                                            {/* Email or Phone */}
                                            {loginMethod === "email" ? (
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
                                                            value={loginEmail}
                                                            onChange={(e) => setLoginEmail(e.target.value)}
                                                            placeholder="you@example.com"
                                                            className="flex-1 ml-3 outline-none"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-1">
                                                    <label
                                                        htmlFor="login-phone"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Phone
                                                    </label>
                                                    <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                                        <Phone className="w-5 h-5 text-gray-400" />
                                                        <input
                                                            id="login-phone"
                                                            type="tel"
                                                            value={loginPhone}
                                                            onChange={(e) => setLoginPhone(e.target.value)}
                                                            placeholder="+91 9876543210"
                                                            className="flex-1 ml-3 outline-none"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            <div className="space-y-1">
                                                <label
                                                    htmlFor="login-password"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Password
                                                </label>
                                                <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                                    <Lock className="w-5 h-5 text-gray-400" />
                                                    <input
                                                        id="login-password"
                                                        type="password"
                                                        value={loginPassword}
                                                        onChange={(e) => setLoginPassword(e.target.value)}
                                                        placeholder="••••••••"
                                                        className="flex-1 ml-3 outline-none"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full bg-black hover:bg-gray-200  hover:text-black text-white p-2 rounded-md disabled:opacity-50 transition-all"
                                            >
                                                {loading ? "Logging in..." : "Login"} 
                                            </button>
                                        </form>
                                    </motion.div>
                                )}
                                {activeTab === "signup" &&(
                                    <motion.div
                                        key="signup"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <GoogleButton/>
                                        <PhoneButton/>
                                        <div className="relative my-6">
                                            <hr />
                                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500">
                                                or
                                            </span>
                                        </div>
            
                                        <form onSubmit={handleNext} className="space-y-4">
                                            {/* Username */}
                                            <div className="space-y-1">
                                                <label
                                                    htmlFor="username"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Username
                                                </label>
                                                <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                                    <User className="w-5 h-5 text-gray-400" />
                                                    <input
                                                        id="username"
                                                        type="text"
                                                        value={username}
                                                        onChange={(e) => setusername(e.target.value)}
                                                        placeholder="Username"
                                                        className="flex-1 ml-3 outline-none"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div className="space-y-1">
                                                <label
                                                    htmlFor="signup-email"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Email
                                                </label>
                                                <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                                    <Mail className="w-5 h-5 text-gray-400" />
                                                    <input
                                                        id="signup-email"
                                                        type="email"
                                                        value={signupEmail}
                                                        onChange={(e) => setSignupEmail(e.target.value)}
                                                        placeholder="you@example.com"
                                                        className="flex-1 ml-3 outline-none"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Password */}
                                            <div className="space-y-1">
                                                <label
                                                    htmlFor="signup-password"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Password
                                                </label>
                                                <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                                    <Lock className="w-5 h-5 text-gray-400" />
                                                    <input
                                                        id="signup-password"
                                                        type="password"
                                                        value={signupPassword}
                                                        onChange={(e) => setSignupPassword(e.target.value)}
                                                        placeholder="••••••••"
                                                        className="flex-1 ml-3 outline-none"
                                                        required
                                                    />
                                                </div>
                                                <p className="text-gray-500 text-sm">
                                                    Minimum 6 characters
                                                </p>
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full bg-black hover:bg-gray-200 hover:text-black text-white  p-2 rounded-md disabled:opacity-50 transition-all"
                                            >
                                                Next
                                            </button>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}