import { StudyMaterial } from "../models/studyMaterial.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

const createStudyMaterial = asyncHandler(async (req, res) => {
  const { title, description, category, pages } = req.body;

  if (!title || !description || !category || !pages) {
    throw new apiError(400, "All fields are required");
  }

  const fileLocalPath = req.file?.path;

  if (!fileLocalPath) {
    throw new apiError(400, "PDF file is required");
  }

  const upload = await uploadOnCloudinary(fileLocalPath);
  
  let fileUrl = upload.secure_url;

  if (upload.resource_type === "raw") {
    fileUrl = fileUrl.replace("/image/upload/", "/raw/upload/");
  }

  if (!fileUrl) {
    throw new apiError(500, "File upload failed");
  }
  
  const material = await StudyMaterial.create({
    title: title.trim(),
    description,
    category,
    pages,
    fileUrl,
    publicId: upload.public_id,
    resourceType: upload.resource_type,
    uploadedBy: req.user._id,
  });

  return res
    .status(201)
    .json(new apiResponse(201, material, "Study material uploaded"));
});

const getAllStudyMaterials = asyncHandler(async (req, res) => {
  const materials = await StudyMaterial.find({ isActive: true })
    .select("title description category pages type fileUrl");

  return res.status(200).json(
    new apiResponse(200, materials, "Study materials fetched")
  );
});

const deleteStudyMaterial = asyncHandler(async (req, res) => {

  const { id } = req.params;  
  if (!id) {
    throw new apiError(400, "Material ID is required");
  }
  const material = await StudyMaterial.findById(id);

  if (!material) {
    throw new apiError(404, "Material not found");
  }

  // Delete from Cloudinary
  await cloudinary.uploader.destroy(material.publicId, {
    resource_type: material.resourceType,
  });

  await material.deleteOne();

  return res.status(200).json(
    new apiResponse(200, null, "Study material deleted")
  );
});



export {
    createStudyMaterial,
    getAllStudyMaterials,
    deleteStudyMaterial
}