import { StatusCodes } from "http-status-codes";
import crypto from "crypto";
import ejs from "ejs";
import path from "path";
import { AppError } from "../../helperFunctions/globalError/globalErrorHelperFunction";
import { envVars } from "../../config";
import { prisma } from "../../lib/prisma";
import { redisClient } from "../../lib/redis";
import { transporter } from "../../lib/nodemailer";
import type { TResendOtpEmailPayload } from "./email.zod.validation";

const resendOtpEmailVerify = async ({ email }: TResendOtpEmailPayload) => {
	const normalizedEmail = email.trim().toLowerCase();
	const user = await prisma.user.findUnique({
		where: { email: normalizedEmail },
		select: {
			email: true,
			full_name: true,
			is_email_verified: true,
		},
	});

	if (!user) {
		throw new AppError("No user found with this email address.", StatusCodes.NOT_FOUND);
	}

	if (user.is_email_verified) {
		throw new AppError("This email address is already verified.", StatusCodes.CONFLICT);
	}

	const expirationSeconds = 5 * 60;
	const otpValue = crypto.randomInt(100000, 1000000).toString();
	const otpKey = `new_user_welcome_otp:${normalizedEmail}`;
	const templatePath = path.join(
		process.cwd(),
		"src/templates/resend_otp_email_verify.ejs",
	);
	const html = await ejs.renderFile(templatePath, {
		name: user.full_name,
		OTP: otpValue,
		expirationMinutes: expirationSeconds / 60,
		year: new Date().getFullYear(),
	});

	await redisClient.set(otpKey, otpValue, {
		expiration: {
			type: "EX",
			value: expirationSeconds,
		},
	});

	try {
		await transporter.sendMail({
			from: `"${envVars.EMAIL_SENDER_NAME}" <${envVars.EMAIL_SENDER}>`,
			to: normalizedEmail,
			subject: "Your New Model Academy Verification Code",
			html,
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : "Failed to send email.";
		throw new AppError(message, StatusCodes.BAD_REQUEST);
	}
};

export const emailServices = {
	resendOtpEmailVerify,
};

