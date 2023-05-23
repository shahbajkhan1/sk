import mongoose from "mongoose";

const listingschm = new mongoose.Schema({
    title: { type: String, required: true },
    spanText: { type: String, required: true },
    autoText1: { type: String, required: true },
    autoText2: { type: String, required: true },
    collorCode: { type: String, required: true },
    image: { type: String, required: true },
}, { timestamps: true })
const bannerS = mongoose.model("banner", listingschm)
export default bannerS;