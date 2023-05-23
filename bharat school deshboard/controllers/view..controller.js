import SchoolViews from "../models/view.model.js"

export const createView = async (req, res) => {
    try {
        const findById = await SchoolViews.findOne({ userId: req.body.userId, schoolId: req.body.schoolId })
        if (findById) {
            res.send({
                status: false,
                msg: 'already view',
                data: {}
            })
        } else {
            const insert = await SchoolViews.create(req.body)
            res.send({ status: true, msg: 'views', data: insert })
        }
    } catch (error) {
        res.status(400).send({
            status: false,
            msg: 'something went wrong',
            data: error
        })
    }
}
export const countView = async (req, res) => {
    try {
        const findViews = await SchoolViews.aggregate([
            // {
            //     $match: {
            //         status: true
            //     }
            // },
            {
                $group: {
                    _id: "$schoolId"
                }
            },
            {
                $lookup: {
                    from: "schoolsdatas",
                    localField: "_id",
                    foreignField: "_id",
                    as: "schools"
                }
            },
            {
                $unwind: {
                    path: "$schools",
                    preserveNullAndEmptyArrays: true
                },
            },
            {
                $lookup: {
                    from: "dps",
                    localField: "_id",
                    foreignField: "who_upload",
                    pipeline: [
                        {
                            $match: {
                                status: true
                            },
                        }
                    ],
                    as: "profile"
                }
            },
            {
                $unwind: {
                    path: "$profile",
                    preserveNullAndEmptyArrays: true
                },
            },
            {
                $lookup: {
                    from: "schoolviews",
                    localField: "_id",
                    foreignField: "schoolId",
                    as: "ViewData"
                }
            },
            {
                $project: {
                    schools: 1,
                    profile: 1,
                    views: { $size: "$ViewData" }
                }
            },
            {
                $sort: { views: -1 }
            }
        ])
        if (findViews.length == 0) {
            res.status(404).send({status:false,msg:'data not founds',data:{}})
        } else {
            res.send({ status: true, msg: 'school views', data: findViews })
        }
    } catch (error) {
        res.status(400).send({
            status: false,
            msg: 'something went wrong',
            data: error
        })
    }
}
