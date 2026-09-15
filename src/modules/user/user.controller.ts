import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { TUserCreatePayload } from "./user.zod.validation.js";
import { userServices } from "./user.service.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { StatusCodes } from "http-status-codes";

const createuser = catchAsync(async(req:Request, res: Response, next: NextFunction)=>{
    const payload : TUserCreatePayload = req.body;
    const result =await userServices.createUser(payload)
    console.log({result});
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: `User created successfully.`,
        data: result
    })
})

export const userController = {
    createuser
}