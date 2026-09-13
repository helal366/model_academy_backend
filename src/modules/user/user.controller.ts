import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

const createuser = catchAsync(async(req:Request, res: Response, next: NextFunction)=>{
    const payload=req.body;
    console.log(payload);
    res.send({payload})
})

export const userController = {
    createuser
}