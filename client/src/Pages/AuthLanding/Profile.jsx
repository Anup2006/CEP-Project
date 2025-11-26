import { useState,useEffect } from "react";
import { User,BookOpen,Image } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import { signupUser } from "../../redux/authSlice.js";
import { toast } from "sonner";

export default function Profile() {
    const [fullname,setFullName]=useState("");
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
        if(!formData || !fullname || !grade || !avatar ){
            toast.error("Please fill all the details");
            return;
        }
        dispatch(signupUser({
            email:formData.signupEmail,
            username:formData.username,
            fullname,
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
            <div className="flex flex-col items-center justify-center px-80 min-h-screen bg-gray-100">
                <form onSubmit={handleSignup} className="bg-white rounded-xl shadow-md w-full p-8">
                    <div className="space-y-8 flex flex-col items-center bg-justify-center">
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
                                    className="flex-1 ml-3 outline-none"
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
                                <input 
                                    id="grade"
                                    type="number" 
                                    value={grade}
                                    onChange={(e)=>setGrade(Number(e.target.value))}
                                    placeholder="Grade (eg. 10 or 12)"
                                    className="flex-1 ml-3 outline-none"
                                    required/>
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
                                    className="flex-1 ml-3 outline-none"/>
                            </div>
                            {preview && (
                                <img 
                                    src={preview}
                                    alt="preview avatar"
                                    className="w-32 h-32 rounded-full mt-3 shadow"
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
        </>
    )
}