import Express from "express";
import { alldataget, GetUser, userLogin, userSignup, userUpdate } from "../controllers/unique.User.controllers.js";
import { imageUploads } from "../servic/img.video.service.js";
import { authentication } from "../middleware/authentication.js";
const userRouter = Express.Router()
userRouter.route('/deshboar-user/registration-page/api').post(userSignup)
userRouter.route('/deshboard-user/login/page-apis-node').post(userLogin)
userRouter.route('/deshboard-unique-user/gets-api').get(authentication,GetUser)
userRouter.route('/get/all/data').get(authentication,alldataget)
userRouter.route('/user/profile-update').get(authentication,imageUploads.single('image'),userUpdate)


export default userRouter