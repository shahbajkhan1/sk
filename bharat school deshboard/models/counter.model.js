import mongoose from 'mongoose'

const counterSchemas = new mongoose.Schema({
    schools: { type: Number },
    users: { type: Number },
    ratings: { type: Number },
}, { timestamps: true })
const Counter = mongoose.model('counter', counterSchemas)
export default Counter