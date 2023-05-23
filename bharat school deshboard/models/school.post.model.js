import mongoose from "mongoose";

const posts = new mongoose.Schema({
    titel:{type:String,required:false},
    image:{type:String,require:true},
    schoolId:{type:mongoose.Schema.Types.ObjectId,ref:'SchoolsData'},
    isDelete:{type:Boolean,required:true}
},{timestamps:true})
const SchoolPost = mongoose.model('school_post',posts)
export default SchoolPost