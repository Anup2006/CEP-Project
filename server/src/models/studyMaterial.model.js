import mongoose,{Schema} from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const materialSchema = new Schema({
    file:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,  
    },
    material_badge:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    pages:{
        type:Number,
        default:0,
    }
},{timestamps:true});

materialSchema.plugin(mongooseAggregatePaginate)

export const StudyMaterial= mongoose.model('StudyMaterial',materialSchema);