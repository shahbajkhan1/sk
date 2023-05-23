import mongoose from "mongoose";

const role = new mongoose.Schema({
    name: {type:String,required:true},
},{timestamps:true})
const Role = mongoose.model('roles',role)
export default Role