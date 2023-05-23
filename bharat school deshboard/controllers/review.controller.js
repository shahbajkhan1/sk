import mongoose from "mongoose"
import reviews from "../models/review.model.js"

export const reviewCreate = async (req, res) => {
    try {
        const findREviews = await reviews.findOne({ userId: req.body.userId, schoolId: req.body.schoolId })
        if (findREviews) {
            res.send({
                status: false,
                msg: 'you are already review',
                data: {}
            })
        } else {
            const creates = await reviews.create(req.body)
            res.send({
                status: true,
                msg: 'create successfully',
                data: creates
            })
        }

    } catch (error) {
        res.status(400).send({
            status: false,
            msg: 'something went wrong',
            data: error
        })
    }
}
export const reviewUpdate = async (req, res) => {
    try {
        const findsId = await reviews.findById({ _id: req.body.reviewId })
        if (!findsId) {
            res.send({
                status: false,
                msg: 'data not found',
                data: {}
            })
        } else {
            await reviews.findByIdAndUpdate({ _id: findsId._id }, req.body)
            req.body.text = findsId.text
            res.send({ status: true, msg: 'updated', data: findsId })
        }
    } catch (error) {
        res.status(400).send({
            status: false,
            msg: 'something went wrong',
            data: error
        })
    }
}
export const reviewDelete = async (req, res) => {
    try {
        const findById = await reviews.findById({ _id: req.body.reviewId })
        if (!findById) {
            res.send({
                status: false,
                msg: 'data not found',
                data: {}
            })
        } else {
            var data = {}
            data.is_delete = true
            await reviews.findByIdAndUpdate({ _id: findById._id }, data)
            findById.is_delete = true
            res.send({ status: true, msg: 'updated', data: findById })
        }
    } catch (error) {
        res.status(400).send({
            status: false,
            msg: 'something went wrong',
            data: error
        })
    }
}
export const reviewsList = async (req, res) => {
    try {
        const gateListReviews = await reviews.aggregate([
            {
                $match: {
                    schoolId: new mongoose.Types.ObjectId(req.body.schoolId)
                }
            },
            {
                $lookup: {
                    from: 'schoolsdatas',
                    foreignField: '_id',
                    localField: 'schoolId',
                    as: 'school'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    foreignField: '_id',
                    localField: 'userId',
                    as: 'user'
                }
            }
        ])
        res.send({
            status: true,
            msg: 'success',
            data: gateListReviews
        })
    } catch (error) {
        res.status(400).send({
            status: false,
            msg: 'something went wrong',
            data: error
        })
    }
}