import mongoose from "mongoose";

const viewSchemas = new mongoose.Schema({
    Ip:{type:String,required:false},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    schoolId:{type:mongoose.Schema.Types.ObjectId,ref:'SchoolsData'},
    status:{type:Boolean,default:true}
},{timestamps:true})
const SchoolViews = mongoose.model('schoolView',viewSchemas)
export default SchoolViews