import asyncHandler from "../middleware/asyncHandler.js";
import Bloges from "../models/blog.model.js";

export const createBloges = async (req, res) => {
    try {
        req.body.image = req.file.path
        const datalist = await Bloges.create(req.body)
        res.send({ status: true, Msg: "create list successfull", data: datalist })
    } catch (error) {
        res.status(400).send({
            status: false,
            Msg: "something went wrong",
            data: error
        })
    }
};
export const updateBloges = asyncHandler(async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.path
            const blogesUpdateData = await Bloges.findByIdAndUpdate({ _id: req.params._id }, req.body)
            if (!blogesUpdateData) {
                return res.status(400).send({
                    status: false,
                    msg: 'id not found!',
                    data: null
                })
            }
            res.send({ status: true, msg: "update blog successfull", data: blogesUpdateData })
        }
        const blogesUpdateData = await Bloges.findByIdAndUpdate({ _id: req.params._id }, req.body)
        if (!blogesUpdateData) {
            return res.status(400).send({
                status: false,
                msg: 'id not found!',
                data: null
            })
        }
        res.send({ status: true, msg: "update blog successfull", data: blogesUpdateData })
    } catch (error) {
        res.status(400).send({
            status: false,
            msg: "something went wrong",
            data: error
        })
    }
})
export const getBloges = asyncHandler(async (req, res) => {
    try {
        const bloges = await Bloges.find({}).sort({ "_id": -1 })
        if (bloges == 0) {
            return res.status(404).send({ status: false, msg: 'data not found!', data: null })
        }
        res.send({ status: true, msg: "get blog successfull", data: bloges })
    } catch (error) {
        res.status(400).send({
            status: false,
            msg: "something went wrong",
            data: error
        })
    }
})
