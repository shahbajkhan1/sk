import mongoose from "mongoose";

const BlogesDSchm = new mongoose.Schema({
    image: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    blogeId: { type: mongoose.Schema.Types.ObjectId, ref: "blog" },
    title: { type: String, require: true },
    description: { type: String, require: true },
    like: { type: Number, require: true },
    comment: { type: Number, require: true },
    writeBy: { type: String, require: true },
    is_delete: { type: Boolean, default: false },
    status: { type: Boolean, default: true }
}, { timestamps: true })
const blogeDetail = mongoose.model("blogeDetail", BlogesDSchm)
export default blogeDetail;