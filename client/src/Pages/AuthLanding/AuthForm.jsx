import { GraduationCap,Mail,Phone,Lock,User} from "lucide-react";
import { useState,useEffect} from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import GoogleButton from "./GoogleButton.jsx";
import PhoneButton from "./PhoneButton.jsx";
import {toast} from "sonner";
import {useDispatch,useSelector} from 'react-redux';
import {loginUser,signupUser, resendOtpUser,setOtpEmail,verifyOtpUser,clearOtpState} from '../../redux/authSlice.js';
import { NavLink } from "react-router";
import OtpForm from "./OtpForm.jsx";


export default function AuthForm(){
    const [activeTab, setActiveTab] = useState("login");
    const [loginMethod, setLoginMethod] = useState("email");
    const {token,loading, otpUserId, resending,otpEmail} = useSelector((state)=>state.auth);
    const [otp, setOtp] = useState("");

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

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!username || !signupEmail || !signupPassword){
            return toast.error("Please fill all fields");
        }
        dispatch(signupUser({
            email:signupEmail,
            username:username,
            password:signupPassword,
        }))
        dispatch(setOtpEmail(signupEmail));

    }

    const handleVerifyOtp= ()=>{
        if (otp.length !== 6) return toast.error("Enter 6-digit OTP");
        dispatch(verifyOtpUser({ userId: otpUserId, otp }))
            .unwrap()
            .then(() => toast.success("Email verified & logged in!"))
            .catch(err => toast.error(err?.message || "OTP verification failed"));
    }

    
    const handleResendOtp = () => {
        dispatch(resendOtpUser({ userId: otpUserId }))
            .unwrap()
            .then(() => toast.success("OTP resent to your email"))
            .catch(() => toast.error("Failed to resend OTP"));
    };

    useEffect(() => {
        if (token) {
            navigate("/app", { replace: true });
        }
    }, [token,navigate]);
    
    if (otpUserId) {
        return (
        <OtpForm
            email={otpEmail}
            otp={otp}
            setOtp={setOtp}
            handleVerifyOtp={handleVerifyOtp}
            handleResendOtp={handleResendOtp}
            loading={loading}
            resending={resending}
            onBack={() => {
                setOtp(""),
                dispatch(clearOtpState());
            }}
        />
        );
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
                <div className="flex flex-col md:flex-row bg-blue-100 shadow-xl rounded-3xl w-full max-w-5xl overflow-hidden">
                    
                    <div className="flex flex-col items-center justify-center text-center md:w-1/2 p-6 bg-blue-50">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="mb-4"
                    >
                        <GraduationCap className="w-16 h-16 md:w-24 md:h-24 text-600 mx-auto" />
                    </motion.div>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-2">CareerCampus</h1>
                    <p className="text-gray-600 text-sm md:text-base">Career Orientation for Youth</p>
                    </div>

                    <div className="flex flex-col md:w-1/2 p-6 bg-white">
                    <div className="w-full max-w-md mx-auto">
                        <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold">CareerCampus</h1>
                        <p className="text-gray-500 text-sm">Sign in or create an account</p>
                        </div>

                        <div className="flex mb-6 rounded-lg bg-gray-100 overflow-hidden">
                        <button
                            onClick={() => setActiveTab("login")}
                            className={`flex-1 py-2 px-4 transition-all font-medium ${
                            activeTab === "login"
                                ? "bg-white shadow-sm text-black"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setActiveTab("signup")}
                            className={`flex-1 py-2 px-4 transition-all font-medium ${
                            activeTab === "signup"
                                ? "bg-white shadow-sm text-black"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Sign Up
                        </button>
                        </div>

                        <AnimatePresence mode="wait">
                        {activeTab === "login" && (
                            <motion.div
                            key="login"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            >
                            <GoogleButton isSignup={false} />
                            <PhoneButton />

                            <div className="relative my-6">
                                <hr className="border-gray-300" />
                                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500 text-sm">
                                or
                                </span>
                            </div>

                            <div className="flex gap-2 mb-4 bg-gray-100 rounded-lg p-1">
                                <button
                                onClick={() => setLoginMethod("email")}
                                className={`flex-1 py-2 px-4 rounded-md transition-all text-sm md:text-base ${
                                    loginMethod === "email"
                                    ? "bg-white shadow-sm text-black"
                                    : "text-gray-600 hover:text-gray-900"
                                }`}
                                >
                                <Mail className="w-4 h-4 inline mr-2" /> Email
                                </button>
                                <button
                                onClick={() => setLoginMethod("phone")}
                                className={`flex-1 py-2 px-4 rounded-md transition-all text-sm md:text-base ${
                                    loginMethod === "phone"
                                    ? "bg-white shadow-sm text-black"
                                    : "text-gray-600 hover:text-gray-900"
                                }`}
                                >
                                <Phone className="w-4 h-4 inline mr-2" /> Phone
                                </button>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-4">
                                {loginMethod === "email" ? (
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">
                                    Email
                                    </label>
                                    <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="flex-1 ml-3 outline-none text-sm md:text-base"
                                        required
                                    />
                                    </div>
                                </div>
                                ) : (
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">
                                    Phone
                                    </label>
                                    <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                    <Phone className="w-5 h-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        value={loginPhone}
                                        onChange={(e) => setLoginPhone(e.target.value)}
                                        placeholder="+91 9876543210"
                                        className="flex-1 ml-3 outline-none text-sm md:text-base"
                                        required
                                    />
                                    </div>
                                </div>
                                )}

                                <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                    <Lock className="w-5 h-5 text-gray-400" />
                                    <input
                                    type="password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="flex-1 ml-3 outline-none text-sm md:text-base"
                                    required
                                    />
                                </div>
                                <NavLink
                                    to="/auth/forgetPassword"
                                    className="text-gray-500 text-xs md:text-sm"
                                >
                                    Forget Password?
                                </NavLink>
                                </div>

                                <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black hover:bg-gray-200 hover:text-black text-white p-2 rounded-md text-sm md:text-base disabled:opacity-50 transition-all"
                                >
                                {loading ? "Logging in..." : "Login"}
                                </button>
                            </form>
                            </motion.div>
                        )}

                        {activeTab === "signup" && (
                            <motion.div
                            key="signup"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            >
                            <GoogleButton isSignup={true} />
                            <PhoneButton />

                            <div className="relative my-6">
                                <hr className="border-gray-300" />
                                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500 text-sm">
                                or
                                </span>
                            </div>

                            <form onSubmit={handleSignup} className="space-y-4">
                                <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                    <User className="w-5 h-5 text-gray-400" />
                                    <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setusername(e.target.value)}
                                    placeholder="Username"
                                    className="flex-1 ml-3 outline-none text-sm md:text-base"
                                    required
                                    />
                                </div>
                                </div>

                                <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <input
                                    type="email"
                                    value={signupEmail}
                                    onChange={(e) => setSignupEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="flex-1 ml-3 outline-none text-sm md:text-base"
                                    required
                                    />
                                </div>
                                </div>

                                <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                    <Lock className="w-5 h-5 text-gray-400" />
                                    <input
                                    type="password"
                                    value={signupPassword}
                                    onChange={(e) => setSignupPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="flex-1 ml-3 outline-none text-sm md:text-base"
                                    required
                                    />
                                </div>
                                <p className="text-gray-500 text-xs md:text-sm">
                                    Minimum 6 characters
                                </p>
                                </div>

                                <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black hover:bg-gray-200 hover:text-black text-white p-2 rounded-md text-sm md:text-base disabled:opacity-50 transition-all"
                                >
                                {loading ? "Creating Account..." : "Sign Up"}
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