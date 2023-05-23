import Testimonial from "../models/testimonials.js";

export const createTestImonials = async (req, res) => {
    try {
        const testimonial = await Testimonial.findOne({
            $and: [
                { name: req.body.name },
                { designation: req.body.designation }
            ]
        });
        if (testimonial) {
            return res.send({ status: false, msg: 'name is already exists!', data: null })
        }
        req.body.image = req.file.path
        req.body.userId = req.session.userId
        const datalist = await Testimonial.create(req.body)
        res.send({ status: true, msg: "testimonials create successfully", data: datalist })
    } catch (error) {
        res.status(400).send({
            status: false,
            msg: "something went wrong",
            data: error
        })
    }
};
export const DeleteTestImonials = async (req, res) => {
    try {
        var data = {}
        data.is_delete = true
        const list = await Testimonial.findOneAndUpdate({ _id: req.body._id }, data)
        res.send({ status: true, msg: "delete successfully", data: list })
    } catch (error) {
        res.status(400).send({
            status: false,
            Msg: "something went wrong",
            data: error
        })
    }
}
export const testImonialsUpdate = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.path
            const imgdelete = await Testimonial.findByIdAndUpdate({ _id: req.params._id }, data)
            if (imgdelete) {
                res.status(404).send({ status: false, msg: 'Id not found!', data: null });
                return;
            }
            res.send({ status: true, msg: "testimonial update successfully!", data: imgdelete });
        }
        const imgdelete = await Testimonial.findByIdAndUpdate({ _id: req.params._id }, data)
        if (imgdelete) {
            res.status(404).send({ status: false, msg: 'Id not found!', data: null });
            return;
        }
        res.send({ status: true, msg: "testimonial update successfully!", data: imgdelete });
    } catch (error) {
        res.status(400).send({ status: false, msg: "something went wrong!", data: error });
    }
}
export const testImonialGets = async (req, res) => {
    try {
        const list = await Testimonial.find().sort({ "_id": -1 })
        if (list.length == 0) {
            res.status(404).send({ status: false, msg: 'data not found', data: null })
            return;
        }
        res.send({ status: true, msg: 'data get successfully', data: list })
    } catch (error) {
        res.status(400).send({
            status: false,
            msg: "something went wrong",
            data: error
        })
    }
}