import express from 'express';
import http from 'http';
import conn from './config/db.js';
import cors from 'cors'
import schoolRouter from './routers/school.detail.router.js';
import userRouter from './routers/unique.User.router.js';
import viewRouter from './routers/view.router.js';
import reviewRouter from './routers/review.router.js';
import aboutRouter from './routers/aboutUs.js';
import listRouter from './routers/blog.router.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import listingRoute from './routers/list.router.js';
import bannerWeb from './routers/banners.router.js';
import testimonialRouter from './routers/testimonials.js';
import errorHandler from './middleware/error.handler.js';
import counterRouter from './routers/counter.router.js';
import blogeDetailRouter from './routers/bloge.detail.router.js';

const port = 4444
const app = express()
app.use(express.json())
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(cookieParser())
conn()
app.use(cors())
app.use(errorHandler)
app.use(userRouter)
app.use(viewRouter)
app.use(schoolRouter)
app.use(reviewRouter)
app.use(aboutRouter)
app.use(listRouter)
app.use(listingRoute)
app.use(bannerWeb)
app.use(testimonialRouter)
app.use(counterRouter)
app.use(blogeDetailRouter)
app.use('/image', express.static('image'))

const server = http.createServer(app)
server.listen(port, () => console.log(`App listening on port ${port}!`))