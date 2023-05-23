import aboutModel from "../models/aboutUs.js";

export const aboutimgupload = async (req, res) => {
    try {
        var array = []
        req.files.forEach(element => {
            var file = element.path;
            array.push(file)
        });
        req.body.image = array
        req.body.userId = req.session.userId
        const uplaod = await aboutModel.create(req.body)
        res.send({ status: true, msg: "create successfull", data: uplaod })
    } catch (error) {
        res.status(400).send({
            status: false,
            msg: "something went wrong",
            data: error
        })
    }
};

export const aboutUpdate = async (req, res) => {
    try {
        var array = []
        req.files.forEach(element => {
            var file = element.path;
            array.push(file)
        });
        req.body.image = array
        const imgdelete = await aboutModel.findByIdAndUpdate({ _id: req.params._id }, req.body)
        if (!imgdelete) {
            res.status(404).send({ status: false, msg: 'Id not found!', data: null });
            return;
        }
        res.send({ status: true, msg: "update successfully!", data: imgdelete });
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: false, msg: "something went wrong!", data: error });
    }
}
export const aboutdeleteimage = async (req, res) => {
    try {
        var data = {}
        data.is_delete = true
        const imgdelete = await aboutModel.findByIdAndUpdate({ _id: req.body.aboutId }, data)
        if (imgdelete) {
            res.status(404).send({ status: false, msg: 'Id not found!', data: null });
            return;
        }
        imgdelete.is_delete = true
        res.send({ status: true, msg: "image delete successfully!", data: imgdelete });
    } catch (error) {
        res.status(400).send({ status: false, msg: "something went wrong!", data: error });
    }
}
export const getAbout = async (req, res) => {
    try {
        const list = await aboutModel.find().sort({ "_id": -1 })
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