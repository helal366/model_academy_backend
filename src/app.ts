import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { html } from "./utils/html.js";
import { userRouter } from "./modules/user/user.route.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import { roleRouter } from "./modules/role/role.route.js";
import { positionRouter } from "./modules/position/position.route.js";

const app:Application=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/v1/smps/user",userRouter)
app.use("/api/v1/smps/position",positionRouter)
app.use("/api/v1/smps/role",roleRouter)

// basic route
app.get("/", (req:Request, res:Response)=>{
    res.send(html)
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;