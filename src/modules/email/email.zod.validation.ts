import z4 from "zod/v4";

export const resendOtpEmailZodSchema = z4.object({
	email: z4.string("Email is required.").trim().check(z4.email("Invalid email format.")),
});

export type TResendOtpEmailPayload = z4.infer<typeof resendOtpEmailZodSchema>;
