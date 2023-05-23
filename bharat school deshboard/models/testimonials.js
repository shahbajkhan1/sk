import mongoose from "mongoose";

const test = new mongoose.Schema({
    name: {type:String,required:true},
    image: {type:String,required:true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "uniqueUser" },
    designation: { type: String, require: true },
    description: { type: String, require: true },
    status:{type:Boolean,default:true},
    is_delete:{type:Boolean,default:false}
}, { timestamps: true })
const Testimonial = mongoose.model("testimonial", test)
export default Testimonial;