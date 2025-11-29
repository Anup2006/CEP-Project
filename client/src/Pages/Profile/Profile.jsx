import { useState } from "react";
import { useSelector } from "react-redux";
import {Edit} from "lucide-react";

export default function Profile(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        class: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {user,token}=useSelector(state=>state.auth);

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
                            <form onSubmit={handleSubmit} className="flex flex-col ">
                                <div className="flex justify-center w-full z=50  mb-10 ">
                                    <span className="flex gap-1 justify-center">
                                                <img 
                                                    src={user?.avatar}
                                                    alt="Profile Pic" 
                                                    className="z=50 w-40 h-40 rounded-full"
                                                    />
                                                <Edit onClick={()=>{document.getElementById("avatar").click()}}/>
                                                <input  
                                                    id="avatar"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e)=>setAvatar(e.target.files[0])}
                                                    className="hidden"
                                                />
                                    </span>
                                </div>
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
                                                name="name"
                                                value={formData.name}
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
                                                name="phone"
                                                value={formData.phone}
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
                                                name="class"
                                                value={formData.class}
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
                                            value={formData.message}
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