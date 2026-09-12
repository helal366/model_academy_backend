import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { html } from "./utils/html.js";
import { userRouter } from "./modules/user/user.route.js";

const app:Application=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/v1/smps/user",userRouter)
app.get("/", (req:Request, res:Response)=>{
    res.send(html)
})
export default app;