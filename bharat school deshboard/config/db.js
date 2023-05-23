import mongoose from "mongoose";
export const conn = async () => {
    await mongoose.connect('mongodb+srv://sahiljoya11:sahil1122@cluster0.syubkoh.mongodb.net/BharaSchoolA2')
}
export default conn