import listing from "../models/list.model.js"

export const listcreate = async (req, res) => {
    try {
        const insert = await listing.create(req.body)
        res.json(insert)
    } catch (error) {
        res.status(400).send({
            status: false,
            msg: 'something went wrong',
            error: error
        })
    }
}
export const findsList = async (req, res) => {
    const find = await listing.find({})
    if (find.length == 0) {
        res.send({
            status: false,
            msg: 'data not found',
            data: null
        })
    } else {
        res.send({
            status: true,
            msg: 'lists',
            data: find
        })
    }
}