import bannerS from "../models/banners.model.js"

// export const bannerCreate = async (req, res) => {
//     try {
//         req.body.image = req.file.path
//         const createData = await bannerS.findByIdAndUpdate({ _id: req.body.bannerId })
//         if (!createData) {
//             res.status(404).send({
//                 status: false,
//                 msg: "ID not found",
//                 data: null
//             })
//         } else {
//             res.status(200).send({
//                 status: true,
//                 msg: "data update successfully",
//                 data: createData
//             })
//         }
//     } catch (error) {
//         res.status(400).send({
//             status: false,
//             Msg: "something went wrong",
//             data: error
//         })
//     }
// }
export const bannerUpdate = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.path
            const imgdelete = await bannerS.findByIdAndUpdate({ _id: req.params._id }, req.body)
            if (!imgdelete) {
                res.status(404).send({ status: false, msg: 'Id not found!', data: null });
                return;
            }
            res.send({ status: true, msg: "update successfully!", data: imgdelete });
            return;
        }
        const imgdelete = await bannerS.findByIdAndUpdate({ _id: req.params._id }, req.body)
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
export const bannerGets = async (req, res) => {
    try {
        const bannersGEt = await bannerS.find().sort({ "_id": -1 })
        if (bannersGEt.length == 0) {
            res.status(404).send({ status: false, msg: 'data not found', data: null })
            return;
        }
        res.send({ status: true, msg: 'data get successfully', data: bannersGEt })
    } catch (error) {
        res.status(400).send({ status: false, msg: "something went wrong", data: error })
    }
}