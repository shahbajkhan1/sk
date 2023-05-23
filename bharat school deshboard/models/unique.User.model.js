import mongoose from "mongoose";

const userSchemas = new mongoose.Schema({
    name:{type:String,required:true},
    gender:{type:String,required:true},
    state:{type:String,required:true},
    graduation:{type:String,required:true},
    birthday:{type:String,require:true},
    number:{type:Number,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    token:{type:String,required:false},
    roles:{type:mongoose.Schema.Types.ObjectId,ref:'roles'}
},{timestamps:true})
const User = mongoose.model('user',userSchemas)
export default User