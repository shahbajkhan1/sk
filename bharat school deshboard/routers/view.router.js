import Express from "express"
import { countView, createView } from "../controllers/view..controller.js"
import { authentication } from "../middleware/authentication.js"
const viewRouter = Express.Router()
viewRouter.route('/view/create').post(authentication,createView)
viewRouter.route('/view/count').get(authentication, countView)
export default viewRouter