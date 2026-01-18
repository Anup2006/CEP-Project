import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit } from "lucide-react";
import { updateAvatar } from "../../redux/authSlice.js";

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    grade: "",
    address: "",
  });
  const { user } = useSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.avatar || "");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!avatar) return;
    const preview = URL.createObjectURL(avatar);
    setPreviewUrl(preview);
    return () => URL.revokeObjectURL(preview);
  }, [avatar]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 md:p-10">
      <div className="flex flex-col lg:flex-row bg-blue-100 shadow-xl w-full max-w-5xl rounded-3xl overflow-hidden">
        
        <div className="flex-1 flex flex-col p-6 md:p-10 bg-blue-50">
          
          <div className="flex flex-col items-center mb-8 relative">
            <span className="relative w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-bold overflow-hidden cursor-pointer">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Profile Pic"
                  className="w-full h-full object-cover rounded-full"
                />
              )}
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setAvatar(file);
                  dispatch(updateAvatar({ avatar: file }));
                }}
                className="hidden"
              />
            </span>
            <Edit
              className="absolute bottom-0 right-0 w-6 h-6 text-gray-700 cursor-pointer bg-white rounded-full p-1"
              onClick={() => document.getElementById("avatar").click()}
            />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                  Full Name <Edit className="w-4 h-4"/>
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  placeholder={user?.fullname}
                  className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  bg-white"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                  Email <Edit className="w-4 h-4"/>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={user?.email}
                  className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                  Phone Number <Edit className="w-4 h-4"/>
                </label>
                <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500 px-3 py-2 bg-white">
                  +91
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder={user?.phoneNumber}
                    className="ml-2 flex-1 outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                  Grade <Edit className="w-4 h-4"/>
                </label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value={user?.grade}>{user?.grade || "Select Grade"}</option>
                  <option value="class-9">Class 9</option>
                  <option value="class-10">Class 10</option>
                  <option value="class-11">Class 11</option>
                  <option value="class-12">Class 12</option>
                  <option value="graduate">Graduate</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                Address <Edit className="w-4 h-4"/>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                placeholder={user?.address || "Your Address"}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 bg-black text-white rounded-md flex justify-center items-center gap-2 hover:bg-gray-800 transition-colors"
            >
              <Edit className="w-4 h-4"/>
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
