import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { emailServices } from "./email.service";
import type { TResendOtpEmailPayload } from "./email.zod.validation";

const resendOtpEmailVerify = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload: TResendOtpEmailPayload = req.body;

    await emailServices.resendOtpEmailVerify(payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "A new verification code has been sent to your email address.",
    });
  },
);

export const emailController = {
  resendOtpEmailVerify,
};
