import asyncHandler from "../middleware/asyncHandler.js";
import Counter from "../models/counter.model.js";

export const createCounter = asyncHandler(async (req, res) => {
    try {
        const counter = await Counter.create(req.body)
        res.send({ status: true, msg: 'create successfully', data: counter })
    } catch (error) {
        res.status(400).send({ status: false, msg: 'something went wrong', data: error })
    }
})
export const counterUpdate = asyncHandler(async (req, res) => {
    try {
        const update = await Counter.findByIdAndUpdate({ _id: req.params._id }, req.body)
        if (!update) {
            return res.status(404).send({ status: false, msg: 'id not found', data: null })
        }
        res.send({ status: true, msg: 'update successfully', data: update })
    } catch (error) {
        res.status(400).send({ status: false, msg: 'something went wrong', data: error })
    }
})
export const counterGet = asyncHandler(async (req, res) => {
    try {
        const getData = await Counter.findById({_id:req.params._id})
        let isArray = []
        isArray.push(
            {
                name: 'School',
                data: getData.schools
            },
            {
                name: 'Rating',
                data: getData.ratings  
            },
            {
                name: 'user',
                data: getData.users  
            }
        )
        if (!getData) {
            return res.status(404).send({ status: false, msg: 'id not found', data: null })
        }
        res.send({ status: true, msg: 'get successfully', data: isArray })
    } catch (error) {
        res.status(400).send({ status: false, msg: 'something went wrong', data: error })
    }
})