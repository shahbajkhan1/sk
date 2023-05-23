import Schools from "../models/school.detail.model.js"

export const insertSchool = async (req, res) => {
    try {
        const findSchool = await Schools.findOne({
            name: req.body.name,
            address: req.body.address
        })
        if (!findSchool) {
            const insertData = await Schools.create(req.body)
            res.send({ status: true, msg: "insert entries", data: insertData })
        } else {
            res.send({ status: false, msg: 'school already existing', data: null })
        }
    } catch (error) {
        res.status(400).send({
            status: false,
            msg: 'something went wrong',
            data: error
        })
    }
}
export const schoolDataUpdate = async (req, res) => {
    try {
        const updateData = await Schools.findById({ _id: req.body.school_id })
        if (!updateData) {
            res.status(404).send({
                status: false,
                msg: 'data not found',
                data: {}
            })
        } else {
            const upDate = await Schools.findByIdAndUpdate({ _id: updateData._id }, req.body)
            res.send({ status: true, msg: "School data update", data: upDate })
        }
    } catch (error) {
        res.status(400).send({
            status: false,
            msg: 'something went wrong',
            data: error
        })
    }
}
// export const findAllSchool = async (req, res) => {
//     try {
//         const finds = await Schools.findById({ _id: req.body.id })
//         if (finds) {
//             res.send({
//                 status: true,
//                 msg: 'success',
//                 data: finds
//             })
//         } else {
//             res.status(404).send({
//                 status: false,
//                 msg: 'data not found',
//                 data: {}
//             })
//         }
//     } catch (error) {
//         res.status(400).send({
//             status: false,
//             msg: 'something went wrong',
//             data: error
//         })
//     }
// }
export const searchSchool = async function (req, res) {
    try {
        const searchData = await Schools.aggregate([
            {
                $match: {
                    "$or": [
                        { address: { $regex: req.query.search } },
                        { name: { $regex: req.query.search } },
                        { classes: { $regex: req.query.search } },
                        { board: { $regex: req.query.search } },
                        { medium: { $regex: req.query.search } },
                        { schoolType: { $regex: req.query.search } },
                        { schoolDescription: { $regex: req.query.search } },
                        { subjects: { $regex: req.query.search } },
                        { eligibility: { $regex: req.query.search } },
                        { type: { $regex: req.query.search } },
                    ]
                }
            }
        ]).sort({ '_id': -1 })
        if (searchData.length == 0) {
            res.status(404).send({
                status: false,
                msg: 'data not found',
                data: {}
            })
        } else {
            res.send({
                status: true,
                msg: 'successfully finds',
                data: searchData
            })
        }
    } catch (error) {
        res.status(400).send({
            status: false,
            msg: 'something went wrong ',
            data: error
        })
    }
}
// export const findSchooByAllDatas = async (req, res) => {
//     try {
//         const findTheAggregate = await Schools.aggregate([
//             {
//                 $lookup: {
//                     from: 'schoolsdatas',
//                     localField: '_id',
//                     foreignField: '_id',
//                     as: 'School'
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "ratings",
//                     localField: "_id",
//                     foreignField: "schoolId",
//                     as: "rating"
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "schoolviews",
//                     localField: "_id",
//                     foreignField: "schoolId",
//                     pipeline: [
//                         {
//                             $match: {
//                                 is_delete: false
//                             }
//                         }
//                     ],
//                     as: "views"
//                 }
//             },
//             {
//                 $project: {
//                     school: 1,
//                     views: { $size: "$views" },
//                     rating: { $size: "$rating" }
//                 }
//             }
//         ])
//         if (findid.length == 0) {
//             res.status(404).send({ status: false, msg: 'data not founds', data: {} })
//         } else {
//             res.send({ status: true, msg: 'schools', data: findTheAggregate })
//         }
//     } catch (error) {
//         res.status(400).send({
//             status: false,
//             msg: "something went wrong",
//             data: error
//         })
//     }
// }
export const schoolfind = async (req, res) => {
    try {
        const findid = await Schools.aggregate([{
            $lookup: {
                from: "schoolsdatas",
                localField: "_id",
                foreignField: "_id",
                pipeline: [
                    {
                        $lookup: {
                            from: "dps",
                            localField: "_id",
                            foreignField: "who_upload",
                            as: "dp"
                        }
                    }
                ],
                as: "school"
            }
        },
        {
            $unwind: {
                path: "$school"
            }
        },
        {
            $lookup: {
                from: "ratings",
                localField: "_id",
                foreignField: "schoolId",
                as: "rating"
            }
        },
        {
            $lookup: {
                from: "schoolviews",
                localField: "_id",
                foreignField: "schoolId",
                pipeline: [
                    {
                        $match: {
                            is_delete: false
                        }
                    }
                ],
                as: "views"
            }
        },
        {
            $project: {
                school: {
                    name: 1,
                    dp: {
                        image: 1
                    }
                },
                views: { $size: "$views" },
                rating: { $size: "$rating" }
            }
        }
        ])
        if (findid.length == 0) {
            res.status(404).send({ status: false, msg: 'data not founds', data: {} })
        } else {
            res.send({ status: true, msg: 'school ', data: findid })
        }
    } catch (error) {
        res.status(400).send({
            status: false,
            msg: "something went wrong",
            data: error
        })
    }
};
//<-----school filter ----->
// export const findFilterToSchool = async (req, res) => {
//     try {
//         let schoolData = await Schools.find()
//         let data = []
//         let boardData = await Schools.aggregate([
//             {
//                 "$group": {
//                     "_id": { "$toLower": "$board" },
//                     "count": { "$sum": 1 }
//                 }
//             },
//             {
//                 "$group": {
//                     "_id": null,
//                     "counts": {
//                         "$push": { "k": "$_id", "v": "$count" }
//                     }
//                 }
//             },
//             {
//                 "$replaceRoot": {
//                     "newRoot": { "$arrayToObject": "$counts" }
//                 }
//             }
//         ])
//         data = data.concat(boardData)
//         let mediumData = await Schools.aggregate([
//             {
//                 "$group": {
//                     "_id": { "$toLower": "$medium" },
//                     "count": { "$sum": 1 }
//                 }
//             },
//             {
//                 "$group": {
//                     "_id": null,
//                     "counts": {
//                         "$push": { "k": "$_id", "v": "$count" }
//                     }
//                 }
//             },
//             {
//                 "$replaceRoot": {
//                     "newRoot": { "$arrayToObject": "$counts" }
//                 }
//             }
//         ])
//         if (data.length == 0) {
//             res.status(404).send({
//                 status: false,
//                 msg: 'data not found',
//                 data: {}
//             })
//         } else {
//             data = data.concat(mediumData)
//             res.send({
//                 status: true,
//                 msg: 'successfully finds',
//                 data: data
//             })
//         }
//     } catch (err) {
//         res.status(500).json({ error: true, message: "Internal Server Error" });
//     }
// }