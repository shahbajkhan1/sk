import User from "../models/unique.User.model.js"
import bcrypt from 'bcrypt'
import Jwt from "jsonwebtoken"
import Schools from "../models/school.detail.model.js"
import reviews from "../models/review.model.js"
import asyncHandler from "../middleware/asyncHandler.js"

export const userSignup = asyncHandler(async (req, res) => {
    try {
        const findsUser = await User.findOne({
            "$or": [
                { number: req.body.number },
                { email: req.body.email }
            ]
        })
        if (findsUser) {
            res.status(409).send({
                status: false,
                msg: 'account already exists',
                data: {}
            })
            return;
        }
        const fontOptions = {
            fontSize: 1000,
            anchor: 'top',
            attributes: { fill: 'pink' }
        };
        const textToSVG = TextToSVG.loadSync();
        function getProfilePic(firstName) {
            const letter = firstName[0].toUpperCase();
            const attributes = {
                x: 0,
                y: 0
            };
            const svg = textToSVG.getSVG(letter, fontOptions, attributes);
            return new Promise((resolve, reject) => {
                svg2img(svg, function (error, buffer) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(buffer);
                    }
                });
            });
        }
        getProfilePic(`${req.body.name}`).then(async buffer => {
            const filePath = `./post/${Date.now()}.jpg`;
            await sharp(buffer)
                .jpeg()
                .toFile(filePath);
            req.body.image = filePath;
        });
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const insert = await User.create(req.body)
        insert.token = await Jwt.sign({ type: Date(), userId: insert._id }, 'tokentoken')
        res.send({
            status: true,
            msg: 'signup successfully',
            data: insert
        })
    } catch (error) {
        res.status(400).send({
            status: false,
            msg: 'something went wrong',
            data: error
        })
    }
});
export const userLogin = asyncHandler(async (req, res) => {
    try {
        const findUser = await User.findOne({
            "$or": [
                { email: req.body.email },
                { number: req.body.number }
            ]
        })
        if (!findUser) {
            res.status(404).send({
                status: false,
                msg: 'account not found',
                data: {}
            })
        } else {
            const passVerify = await bcrypt.compare(req.body.password, findUser.password)
            if (!passVerify) {
                res.send({
                    status: false,
                    msg: 'wrong password',
                    data: {}
                })
            } else {
                findUser.token = await Jwt.sign({ type: Date(), userId: findUser._id }, 'tokentoken')
                req.session.userId = findUser._id
                req.session.token = findUser.token
                res.send({
                    status: true,
                    msg: 'login successfully',
                    data: findUser
                })
            }
        }
    } catch (error) {
        res.status(400).send({ status: false, msg: 'something went wrong', data: error })
    }
})
export const GetUser = asyncHandler(async (req, res) => {
    try {
        const findId = await User.findOne({ _id: req.session.userId })
        if (!findId) {
            res.send({ status: false, msg: 'user not log!', data: null })
        } else {
            res.send({
                status: true,
                msg: "user get successfully",
                data: findId
            })
        }
    } catch (error) {
        res.status(400).send({
            status: false,
            msg: 'something went wrong',
            data: error
        })
    }
});
export const alldataget = asyncHandler(async (req, res) => {
    try {
        const userfindAll = await User.find({}).count()
        const schoolfind = await Schools.find({}).count()
        const revfindAll = await reviews.find({}).count()
        var getalldata = [
            { User: userfindAll },
            { schools: schoolfind },
            { reviews: revfindAll }
        ]
        if (getalldata.length == 0) {
            res.status(404).send({
                status: false,
                msg: 'data not found',
                data: {}
            })
        } else {
            res.send({
                status: true,
                msg: 'get successfully',
                data: getalldata
            })
        }
    } catch (error) {
        res.status(400).send({
            status: false,
            msg: 'somthing went wrong',
            data: error
        })
    }
});
export const userUpdate = async (req, res) => {
    try {
        // const updatedUser = await User.findOne({ _id: req.body.userId });
        // if (updatedUser) {
        //     const isData = await User.findByIdAndUpdate(updatedUser._id, req.body, { new: true });
        //     const updatedUserDP = await userDP.findOneAndUpdate({ who_upload: isData._id }, { $set: {} }, { new: true })
        //         .populate('who_upload', 'name email')
        //         .exec();
        //     updatedUser.userDP = updatedUserDP._id;
        //     await updatedUser.save();
        //     res.send({
        //         status: true,
        //         msg: 'update successfully',
        //         data: updatedUser
        //     })
        // } else {
        //     res.status(404).send({
        //         status: false,
        //         msg: 'data not found',
        //         data: {}
        //     })
        // }
        const updatedUser = await User.findByIdAndUpdate({ _id: req.body.userId });
        if (!updatedUser) {
            res.status(404).send({
                status: false,
                msg: 'data not found',
                data: null
            })
        } else {
            res.send({
                status: true,
                msg: 'update successfully',
                data: updatedUser
            })
        }
    } catch (error) {
        res.status(400).send({
            status: false,
            msg: 'somthing went wrong',
            data: error
        })
    }
}