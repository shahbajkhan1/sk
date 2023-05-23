import Express from "express";
import { createTestImonials, DeleteTestImonials, testImonialGets, testImonialsUpdate } from "../controllers/testimonials.js";
import { authentication } from "../middleware/authentication.js";
import { imageUploads } from "../servic/img.video.service.js";
const testimonialRouter = Express.Router()
testimonialRouter.route('/insert/testimonials').post(authentication,imageUploads.single('image'),createTestImonials)
testimonialRouter.route('/delete/testimonials').delete(authentication,DeleteTestImonials)
testimonialRouter.route('/update-testimonial-api/:_id').put(authentication,imageUploads.single('image'),testImonialsUpdate)
testimonialRouter.route('/get/testimonial-api/GET').get(authentication,testImonialGets)

export default testimonialRouter