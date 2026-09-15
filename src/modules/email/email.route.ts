import { Router } from "express";
import { emailController } from "./email.controller.js";
import { validateZodSchema } from "../../middlewares/validate.zod.schema.js";
import { resendOtpEmailZodSchema } from "./email.zod.validation.js";

const router = Router();
router.post(
  "/resend_otp_email_verify",
  validateZodSchema(resendOtpEmailZodSchema),
  emailController.resendOtpEmailVerify,
);
export const emailRouter: Router = router;
