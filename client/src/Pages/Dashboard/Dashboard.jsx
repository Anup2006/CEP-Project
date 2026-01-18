import { useSelector } from "react-redux";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const updateProfile = () => {
    navigate("/app/update-profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 md:p-10">
      <div className="flex flex-col lg:flex-row bg-blue-100 shadow-xl w-full max-w-6xl rounded-3xl overflow-hidden">
        
        {/* Left Column */}
        <div className="flex-1 flex flex-col p-6 lg:p-10 bg-blue-50 items-center text-center">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <span className="relative flex justify-center items-center w-32 h-32 rounded-full bg-gray-100 font-bold text-2xl text-gray-700">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span>{user?.username?.charAt(0).toUpperCase() || "?"}</span>
              )}
            </span>
          </div>

          {/* User Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Full Name</label>
              <div className="px-3 py-2 bg-white border rounded-md">{user?.fullname}</div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Email Address</label>
              <div className="px-3 py-2 bg-white border rounded-md">{user?.email}</div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Phone Number</label>
              <div className="px-3 py-2 bg-white border rounded-md">
                +91 {user?.phoneNumber}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Grade</label>
              <div className="px-3 py-2 bg-white border rounded-md">{user?.grade}</div>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1 w-full mb-4">
            <label className="text-sm font-medium text-gray-600">Address</label>
            <div className="px-3 py-2 bg-white border rounded-md">
              {user?.address || "Your Address"}
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={updateProfile}
            className="w-full mt-4 px-4 py-2 bg-black text-white rounded-md flex justify-center items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            <Edit className="w-5 h-5" /> Edit
          </button>
        </div>
      </div>
    </div>
  );
}
