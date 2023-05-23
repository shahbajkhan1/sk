import Express from "express";
import { createBloges, getBloges, updateBloges } from "../controllers/blog.con.js";
import { imageUploads } from "../servic/img.video.service.js";
import { authentication } from "../middleware/authentication.js";

const listRouter = Express.Router();
listRouter.route("/blog/create").post(authentication,imageUploads.single("image"), createBloges);
listRouter.route("/blog/update/:_id").put(authentication,imageUploads.single("image"), updateBloges);
listRouter.route("/blog/get-api").get(authentication,getBloges);
export default listRouter