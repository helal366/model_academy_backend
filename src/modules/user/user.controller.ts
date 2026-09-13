import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { TUserCreatePayload } from "./user.zod.validation.js";
import { userServices } from "./user.servide.js";

const createuser = catchAsync(async(req:Request, res: Response, next: NextFunction)=>{
    const payload : TUserCreatePayload = req.body;
    const result = userServices.createUser(payload)
    console.log({payload});
    res.send({payload})
})

export const userController = {
    createuser
}