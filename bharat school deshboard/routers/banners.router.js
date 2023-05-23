import Express from "express";
import {  bannerGets, bannerUpdate } from "../controllers/banner.controllers.js";
import { imageUploads } from "../servic/img.video.service.js";
import { authentication } from "../middleware/authentication.js";

const bannerWebRouter = Express.Router();
// bannerWebRouter.route("/banners-dashboard/post").post(authentication, imageUploads.single('image'), bannerCreate);
bannerWebRouter.route("/banners/update-api/:_id").put(authentication, imageUploads.single('image'), bannerUpdate);
bannerWebRouter.route("/banners/get-all/data-api").get(authentication, bannerGets);
export default bannerWebRouter