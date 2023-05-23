import SchoolPost from "../models/school.post.model"

export const postUpload = async (req, res) => {
    try {
        const uploads = await SchoolPost.create(req.body)
        res.send({
            status: true,
            msg: 'create successfully',
            data: uploads
        })
    } catch (error) {
        res.status(400).send({status:false,msg:'something went wrong!',data:error})
    }
}