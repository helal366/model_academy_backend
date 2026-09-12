import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { html } from "./utils/html";

const app:Application=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.get("/", (req:Request, res:Response)=>{
    res.send(html)
})
export default app;