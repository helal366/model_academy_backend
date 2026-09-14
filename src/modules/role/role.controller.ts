import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { TCreateRoleZodSchema } from "./role.zod.validation";
import { roleServices } from "./role.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createRole = catchAsync(async(req:Request, res:Response, next: NextFunction)=>{
    const payload:TCreateRoleZodSchema= req.body;
    const result = await roleServices.createRole(payload);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: `New Role created successfully.`,
        data: result
    })
});

export const roleController = {
    createRole
}