import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {Edit} from "lucide-react";
import { updateAvatar } from "../../redux/authSlice.js";

export default function UpdateProfile(){
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        grade: "",
        address: ""
    });
    const {user,token}=useSelector(state=>state.auth);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [avatar,setAvatar]=useState("");
    const [previewUrl,setPreviewUrl]=useState(user?.avatar || "");

    const dispatch=useDispatch();

    useEffect(()=>{
        if (!avatar) return;

        const preview=URL.createObjectURL(avatar);
        setPreviewUrl(preview);
        return ()=>{
            URL.revokeObjectURL(preview);
        }

    },[avatar])

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
    const handleSubmit=async()=>{
    }
    return(
        <>
            <div className=" relative flex p-80 items-center justify-center h-screen bg-gray-100  pl-60 pr-60 ">
                <div className="flex flex-col md:flex-row bg-blue-100 shadow-xl w-full items-center justify-evenly rounded-3xl">
                    <div className="flex flex-col w-full pt-5 pb-5 rounded-l-2xl justify-center items-center text-center ">
                        <div className="pt-10 p-15 w-full">
                            <div className="flex gap-1 justify-center w-full z=50  mb-10 ">
                                <span className="flex items-center font-bold text-2xl cursor-pointer text-gray-700 w-32 h-32 rounded-full bg-gray-100 justify-center">
                                    <img 
                                        src={previewUrl}
                                        alt="Profile Pic" 
                                        className=" mt-15 w-full h-full rounded-full object-cover"
                                        />
                                    <input  
                                        id="avatar"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e)=>{
                                            const file=e.target.files[0];
                                            setAvatar(file);
                                            setPreviewUrl(file);
                                            dispatch(updateAvatar({avatar:file}))
                                        }}
                                        className="hidden"
                                    />
                                </span>
                                <Edit onClick={()=>{document.getElementById("avatar").click()}}/>
                            </div>
                            <form onSubmit={handleSubmit} className="flex flex-col ">
                                <div className="flex flex-row gap-5 mb-6 ">
                                    <div className="flex w-full flex-col gap-2">
                                        <label htmlFor="name" className="form-label">
                                            <span className="flex gap-1 justify-center">
                                                Full Name<Edit/> 
                                            </span>
                                        </label>
                                        <div className="flex items-center bg-white border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                            <input
                                                type="text"
                                                id="name"
                                                name="fullname"
                                                value={formData.fullname}
                                                onChange={handleInputChange}
                                                className="flex-1 ml-3 outline-none"
                                                placeholder={user?.fullname}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full gap-2">
                                        <label htmlFor="email" className="form-label">
                                            <span className="flex gap-1 justify-center">
                                                Email Address<Edit/> 
                                            </span>
                                        </label>
                                        <div className="flex items-center bg-white border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="flex-1 ml-3 outline-none"
                                                placeholder={user?.email}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex mb-6 flex-row gap-5">
                                    <div className="flex w-full flex-col gap-2">
                                        <label htmlFor="phone" className="form-label">
                                            <span className="flex gap-1 justify-center">
                                                Phone Number<Edit/>  
                                            </span>
                                        </label>
                                        <div className="flex items-center bg-white border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                            +91<input
                                                type="tel"
                                                id="phone"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                className="flex-1 ml-3 outline-none"
                                                placeholder={user?.phoneNumber}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex w-full flex-col gap-2">
                                        <label htmlFor="class" className="form-label">
                                            <span className="flex gap-1 justify-center">
                                                Grade<Edit/>                                           
                                            </span>
                                        </label>
                                        <div className="flex items-center bg-white border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                            <select
                                                id="class"
                                                name="grade"
                                                value={formData.grade}
                                                onChange={handleInputChange}
                                                className="flex-1 ml-3 outline-none"
                                                defaultValue={user?.grade}
                                                >
                                                <option value={user?.grade}>{user?.grade}</option>
                                                <option value="class-9">Class 9</option>
                                                <option value="class-10">Class 10</option>
                                                <option value="class-11">Class 11</option>
                                                <option value="class-12">Class 12</option>
                                                <option value="graduate">Graduate</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex mb-6 flex-col gap-2">
                                    <label htmlFor="address" className="form-label">
                                        <span className="flex gap-1 justify-center">
                                            Address<Edit/>
                                        </span>
                                    </label>
                                    <div className="flex items-center bg-white border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                        <textarea
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            rows={2}
                                            className="flex-1 ml-3 outline-none"
                                            placeholder="Your Address"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="submit-button"
                                >
                                    {isSubmitting && (
                                        <div className="loading-spinner"></div>
                                    )}
                                    {isSubmitting ? "Updating..." : "Edit"}
                                </button>
                            </form>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}