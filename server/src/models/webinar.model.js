import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const webinarSchema = new Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    speaker: {
      name: String,
      bio: String,
      avatar: String,
    },
    date: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number, 
      required: true,
    },
    meetingLink: {
      type: String, // Zoom / Google Meet / Teams
      required: true,
    },
    platform: {
      type: String,
      enum: ["zoom", "google-meet", "teams", "youtube"],
      default: "zoom",
    },
    capacity: {
      type: Number,
      default: 100,
    },
    registeredUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    recordingUrl: {
        type: String,
        default: null,
        required: function () {
            return this.status === "completed";
        }
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
},{
  timestamps:true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

webinarSchema.virtual("status").get(function () {
  const now = new Date();
  const start = new Date(this.date);
  const end = new Date(start.getTime() + (this.duration || 60) * 60000); // duration in ms

  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "live";
  return "completed";
});

webinarSchema.plugin(mongooseAggregatePaginate)

export const Webinar = mongoose.model('Webinar', webinarSchema);