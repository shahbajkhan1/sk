import Express from "express";
import { counterGet, counterUpdate, createCounter } from "../controllers/counter.controller.js";
import { authentication } from "../middleware/authentication.js";

const counterRouter = Express.Router()
counterRouter.route('/counter/create').post(authentication,createCounter)
counterRouter.route('/counter/update/:_id').put(authentication,counterUpdate)
counterRouter.route('/counter/get/:_id').get(authentication,counterGet)
export default counterRouter