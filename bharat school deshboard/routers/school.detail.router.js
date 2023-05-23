import Express from "express";
import {  insertSchool, schoolDataUpdate, schoolfind, searchSchool } from "../controllers/school.detail.controllers.js";
import { authentication } from "../middleware/authentication.js";

const schoolRouter = Express.Router()
schoolRouter.route('/school/insert').post(authentication,insertSchool)
schoolRouter.route('/school/data/update').put(authentication,schoolDataUpdate)
// schoolRouter.route('/find/school').get(findAllSchool)
schoolRouter.route('/school').get(authentication,searchSchool)
// schoolRouter.route('/school/profile/all-data').get(findSchooByAllDatas)
schoolRouter.route('/school/find').get(authentication,schoolfind)
// schoolRouter.route('/school/find-to/filter').get(findFilterToSchool)

export default schoolRouter;