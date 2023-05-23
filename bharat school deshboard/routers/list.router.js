import Express from "express";
import { findsList, listcreate } from "../controllers/list.controller.js";
import { imageUploads } from "../servic/img.video.service.js";
import { authentication } from "../middleware/authentication.js";

const listingRoute = Express.Router()
listingRoute.route('/list-create').post(authentication,imageUploads.single('image'), listcreate)
listingRoute.route('/list-gets').get(authentication,findsList)
export default listingRoute;