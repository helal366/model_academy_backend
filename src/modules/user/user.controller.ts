import { NextFunction, Request, Response } from "express";

const createuser = async(req:Request, res: Response, next: NextFunction)=>{
    const payload=req.body;
    console.log(payload);
    res.send({payload})
}

export const userController = {
    createuser
}