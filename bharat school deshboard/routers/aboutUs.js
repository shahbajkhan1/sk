import Express from "express";
import { aboutUpdate, aboutdeleteimage, aboutimgupload, getAbout } from "../controllers/aboutUs.js";
import { imageUploads } from "../servic/img.video.service.js";
import { authentication } from "../middleware/authentication.js";

const aboutRouter = Express.Router()
aboutRouter.route("/about-Us/create-data").post(authentication, imageUploads.array("image", 4), aboutimgupload);
aboutRouter.route("/about-us/delete-api").delete(authentication, aboutdeleteimage)
aboutRouter.route("/about/us/get-api").get(authentication, getAbout)
aboutRouter.route("/about-Us-update/api/:_id").put(authentication, imageUploads.array("image", 4), aboutUpdate)
export default aboutRouter