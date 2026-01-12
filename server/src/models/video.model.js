import mongoose,{Schema} from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new Schema({
    title: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String 
    },
    source: {
      type: String,
      enum: ["youtube", "cloudinary"],
      // required: true,
    },
    // YouTube
    youtubeVideoId: {
      type: String 
    },
    channelName: { 
      type: String 
    },
    // Cloudinary
    videoUrl: { 
      type: String 
    },
    publicId: { 
      type: String 
    },
    thumbnail: { 
      type: String 
    },
    duration: { 
      type: String 
    }, // "25:30"
    category: { 
      type: String 
    },
    views: { 
      type: Number, 
      default: 0 
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
videoSchema.plugin(mongooseAggregatePaginate)

export const Video= mongoose.model('Video',videoSchema);