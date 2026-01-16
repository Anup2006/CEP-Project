import mongoose,{Schema} from "mongoose";

const contactSchema = new Schema({
   name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    phone:{
        type: String,
    },
    subject:{
        type: String,
        required: true 
    },
    message: {
      type: String,
      required: true
    },
    isRead: {
      type: Boolean,
      default: false
    }
},{timestamps:true})

contactSchema.index({ isRead: 1, createdAt: -1 });

export const Contact= mongoose.model('Contact',contactSchema);