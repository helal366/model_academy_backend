import { BloodGroup, Gender, Religion} from "#db-client";
import z4 from "zod/v4";

export const userCreateZodSchema = z4.object({
    full_name: z4.string("Invalid name format").trim().min(1, "Full name is required."),
    mobile_number: z4.string().trim().length(14, "Mobile number must be 14 digit and start with +88").regex(/^\+880[1]\d{9}$/, "Invalid Bangladeshi mobile number."),
    gender: z4.enum(Gender, "Invalid gender."),
    blood_group: z4.enum(BloodGroup, "Invalid blood group.").optional(),
    date_of_birth: z4.string("Input is expected to be a string but received null").pipe(z4.coerce.date("Invalid format.")).optional(),
    height_in_cm: z4.number("Invalid number.").optional(),
    weight_in_kg: z4.number("Invalid number.").optional(),
    religion: z4.enum(Religion, "Invalid religion").optional(),
    nationality: z4.string().optional(),
    birth_certificate_number: z4.string("Invalid birth certificate number format").optional(),
    nid_number: z4.string("Invalid nid number format").optional(),
    email: z4.string().check(z4.email("Invalid email format")),
    position_name: z4.string( "Invalid user position format"),
    role_name: z4.string( "Invalid user role format")
})

export type TUserCreatePayload = z4.infer<typeof userCreateZodSchema>;