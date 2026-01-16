import mongoose,{Schema} from "mongoose";

const materialSchema = new Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    resourceType: {
        type: String,
        enum: ["image", "video", "raw"],
        default:"raw",
        required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "PDF",
    },
    pages: {
      type: Number,
      required: true,
    },
    fileUrl: {
      type: String, // Cloudinary secure_url
      required: true,
    },
    publicId: {
      type: String, // Cloudinary public_id (for delete)
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
},
  { timestamps: true }
);

export const StudyMaterial = mongoose.model("StudyMaterial",materialSchema);
