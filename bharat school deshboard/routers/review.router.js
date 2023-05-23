import Express from "express";
import { reviewCreate, reviewDelete, reviewsList, reviewUpdate } from "../controllers/review.controller.js";
import { authentication } from "../middleware/authentication.js";
const reviewRouter = Express.Router()
reviewRouter.route('/school-review/create').post(authentication,reviewCreate)
reviewRouter.route('/school-review/updates').put(authentication,reviewUpdate)
reviewRouter.route('/school-review/delete').delete(authentication,reviewDelete)
reviewRouter.route('/school-review/list-school').get(authentication,reviewsList)
export default reviewRouter