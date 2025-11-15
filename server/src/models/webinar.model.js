import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const webinarSchema = new Schema({
    thumbnail:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    schedule_date:{
        type:String,
        required:true,
    },
    schedule_time:{
        type:String,
        required:true,
    },
    live_link:{
        type:String, //youtube/zoom link
        required:true,
    },
    recorded_file:{
        type:String, //recorded video file from cloudinary
        default:null,
    },
   
    // Recording link (YouTube / Google Drive / Zoom Cloud)
    recorded_link:{
        type:String,
        default:null,
    },
    status:{
        type: String,
        enum:['upcoming','live','completed'],
        default:'upcoming',
    },
},{timestamps:true});

webinarSchema.plugin(mongooseAggregatePaginate)

export const Webinar = mongoose.model('Webinar', webinarSchema);