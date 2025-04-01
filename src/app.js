import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js';
import roleRouter from './routes/role.route.js';
import menuRouter from './routes/menu.route.js';
import subMenuRouter from './routes/subMenu.route.js';
import categoryRouter from './routes/category.route.js';
import businessRouter from './routes/business.route.js';

//routes declaration
app.use("/users", userRouter)
app.use("/role", roleRouter)
app.use("/menu", menuRouter)
app.use("/subMenu", subMenuRouter)
app.use("/category", categoryRouter)
app.use("/business", businessRouter)

// http://localhost:8000/api/v1/users/register

export { app }