import Express from "express";
import { imageUploads } from "../servic/img.video.service.js";
import { GetBlogeDetail, blogeDetailInsert, blogeDetailUpdate } from "../controllers/bloge.detail.controller.js";
import { authentication } from "../middleware/authentication.js";

const blogeDetailRouter = Express.Router();
blogeDetailRouter.route("/blog/create").post(authentication,imageUploads.single("image"), blogeDetailInsert);
blogeDetailRouter.route("/blog/update/:_id").put(authentication,imageUploads.single("image"), blogeDetailUpdate);
blogeDetailRouter.route("/blog/get-api").get(authentication,GetBlogeDetail);
export default blogeDetailRouter