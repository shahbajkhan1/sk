import mongoose from "mongoose";
const listschema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    content:{type:String,required:true},
    image:{type:String,required:false}
},{timestamps:true})
const listing = mongoose.model('list',listschema)
export default listing