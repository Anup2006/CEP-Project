import { User } from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllUsers = asyncHandler( async (req, res) => {
  const users = await User.find().select("-password -refreshToken");
  return res
    .status(200)
    .json(new apiResponse(200, users, "Users fetched successfully"));
});

const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) throw new apiError(404, "User not found");

  if (user.role === "admin") {
    throw new apiError(403, "Cannot delete admin");
  }

  await user.deleteOne();

  return res
    .status(200)
    .json(new apiResponse(200, {userId}, "User deleted successfully"));
});

const updateUserRole = asyncHandler( async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!["student", "mentor"].includes(role)) {
    throw new apiError(400, "Invalid role");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new apiResponse(200, user, "User role updated"));
});

const adminStats = asyncHandler( async (req, res) => {
  const totalUsers = await User.countDocuments();
  const students = await User.countDocuments({ role: "student" });
  const mentors = await User.countDocuments({ role: "mentor" });

  return res.status(200).json(
    new apiResponse(200, {
      totalUsers,
      students,
      mentors,
    }, "Admin dashboard stats")
  );
});

export {
    getAllUsers,
    updateUserRole,
    deleteUser,
    adminStats,
}
