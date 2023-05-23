import mongoose from "mongoose";

const school = new mongoose.Schema({
    name: { type: String, required: true },
    officialNumber: { type: Number, required: true },
    officialEmail: { type: String, required: true },
    address: { type: String, required: true },
    contactInfo: {
        name: { type: String, required: true },
        number: { type: Number, required: true },
        rmId: { type: String, required: true }
    },
    classes: { type: String, required: true },
    board: { type: String, required: true },
    medium: { type: String, required: true },
    type: { type: String,  default: "Boys & Girls" },
    schoolType:{type:String,default:'Private'},
    eligibility:{type:String,required:true},
    subjects:{type:Array,required:true},
    schoolDescription:{type:String,required:true},
    principleThought:{type:String,required:true}
}, { timestamps: true })
const Schools = mongoose.model('SchoolsData', school)
export default Schools