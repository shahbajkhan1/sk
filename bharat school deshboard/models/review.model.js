import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    schoolId:{type:mongoose.Schema.Types.ObjectId,ref:'SchoolsData'},
    text:{type:String,required:true},
    status:{type:Boolean,default:1},
    is_delete:{type:Boolean,default:false}
},{timestamps:true})
const reviews = mongoose.model('review',reviewSchema)
export default reviews