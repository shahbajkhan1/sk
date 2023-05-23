import mongoose from "mongoose";

const imgschm = new mongoose.Schema({
    title: {type:String,required:true},
    image: {type:Array,required:true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "uniqueUser" },
    description: { type: String, require: true },
    status:{type:Boolean,default:true},
    is_delete:{type:Boolean,default:false}
},{timestamps:true})
const aboutModel = mongoose.model("AboutUs", imgschm)
export default aboutModel