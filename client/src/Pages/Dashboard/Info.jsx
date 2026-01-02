import { useState,useEffect } from "react";
import { User,BookOpen,Phone,Image } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import { signupUser } from "../../redux/authSlice.js";
import { toast } from "sonner";

export default function Info() {
    const [fullname,setFullName]=useState("");
    const [phoneNumber,setPhoneNumber]=useState("");
    const [grade,setGrade]=useState("");
    const [avatar,setAvatar]=useState(null);
    const[preview,setPreview]=useState(null);
    const {token,loading,error}=useSelector((state)=>state.auth);

    const dispatch=useDispatch();
    const navigate=useNavigate();
    
    const location = useLocation();
    const formData = location.state;

    useEffect(() => {
        if (!avatar){
            setPreview(null);
            return;
        }
        const previewUrl = URL.createObjectURL(avatar);
        setPreview(previewUrl);

        return () => URL.revokeObjectURL(previewUrl);
    }, [avatar]);

    const handleSignup=(e)=>{
        e.preventDefault();
        if(!formData || !fullname || !phoneNumber || !grade || !avatar ){
            toast.error("Please fill all the details");
            return;
        }
        dispatch(signupUser({
            email:formData.signupEmail,
            username:formData.username,
            fullname,
            phoneNumber,
            grade,
            avatar,
            password:formData.signupPassword,
        }))
    }

    useEffect(()=>{
        if(token){
            navigate("/app/home",{replace:true});
        }
    },[token,navigate])

    if(error){
        console.log(error);
    }
    return (
        < >
            <div className=" relative flex p-80 items-center justify-center h-screen bg-gray-100  pl-60 pr-60 ">
                <div className="flex flex-col md:flex-row bg-white shadow-xl w-full items-center justify-evenly rounded-3xl">
                    <div className="flex flex-col w-full pt-5 pb-5 rounded-l-2xl justify-center items-center text-center ">
                        <form onSubmit={handleSignup} className=" w-full p-10 ">
                            <div className="space-y-8 flex flex-col items-center justify-center">
                                <h1 className="text-5xl font-bold">Add Profile</h1>
                                <div className="w-full flex flex-col space-y-4 items-center">
                                    <label htmlFor="fullname"
                                        className="block text-m font-medium mb-2 text-gray-700">
                                        Full Name
                                    </label>
                                    <div className="flex items-center w-1/2 border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                        <User className="w-5 h-5 text-gray-400" />
                                        <input 
                                            id="fullname"
                                            type="text" 
                                            value={fullname}
                                            onChange={(e)=>setFullName(e.target.value)}
                                            placeholder="Your Name"
                                            className="flex-1 ml-3 outline-none overflow-hidden w-full "
                                            required/>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col space-y-4 items-center">
                                    <label htmlFor="phone-number"
                                        className="block text-m font-medium mb-2 text-gray-700">
                                        Phone Number
                                    </label>
                                    <div className="flex items-center w-1/2 border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                        <Phone className="w-5 h-5 mr-2 text-gray-400" /> 
                                        <span className="text-gray-600">+91</span>
                                        <input 
                                            id="phone-number"
                                            type="text" 
                                            value={phoneNumber}
                                            onChange={(e)=>setPhoneNumber(e.target.value)}
                                            placeholder="XXXXX XXXXX"
                                            maxLength={10}
                                            className="flex-1 ml-3 overflow-hidden w-full outline-none"
                                            required/>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col space-y-4 items-center">
                                    <label htmlFor="grade"
                                        className="block text-m font-medium mb-2 text-gray-700">
                                        Grade
                                    </label>
                                    <div className="flex w-1/2 items-center border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                        <BookOpen className="w-5 h-5 text-gray-400" />
                                        <select
                                            id="grade"
                                            value={grade}
                                            onChange={(e)=>setGrade(e.target.value)}
                                            className="flex-1 ml-3 outline-none overflow-hidden w-full"
                                            >
                                            <option value="">Select your class</option>
                                            <option value="class-9">Class 9</option>
                                            <option value="class-10">Class 10</option>
                                            <option value="class-11">Class 11</option>
                                            <option value="class-12">Class 12</option>
                                            <option value="graduate">Graduate</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col space-y-4 items-center">
                                    <label htmlFor="avatar"
                                        className="block text-m font-medium mb-2 text-gray-700">
                                        Profile Photo
                                    </label>
                                    <div className="flex w-1/2 items-center border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                        <Image className="w-5 h-5 text-gray-400" />
                                        <input  
                                            id="avatar"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e)=>setAvatar(e.target.files[0])}
                                            className="flex-1 ml-3 outline-none overflow-hidden w-full"/>
                                    </div>
                                    {preview && (
                                        <img 
                                            src={preview}
                                            alt="preview avatar"
                                            className="w-32 h-32 rounded-full "
                                        />
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-1/2 bg-black hover:bg-gray-200 hover:text-black text-white  p-2 rounded-md disabled:opacity-50 transition-all"
                                >
                                    {loading ? "Creating Account..." : "Sign Up"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}