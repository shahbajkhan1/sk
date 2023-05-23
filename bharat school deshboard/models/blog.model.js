import mongoose from "mongoose";

const BlogesSchm = new mongoose.Schema({
    image: { type: String, required: true },
    who_upload: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    title: { type: String, require: true },
    body: { type: String, require: true },
    time: { type: Date, require: false },
    category: { type: Date, require: false },
    Date: { type: String, require: false },
    is_delete: { type: Boolean, default: false },
    status: { type: Boolean, default: true }
}, { timestamps: true })
const Bloges = mongoose.model("blog", BlogesSchm)
export default Bloges;