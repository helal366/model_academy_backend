import z4 from "zod/v4";

export const createPositionZodSchema=z4.object({
    position_name: z4.string("Invalid Position Name format").trim().toUpperCase(),
    role: z4.string("Invalid Role Name format").trim().toUpperCase()
});

export type TCreatePositionZodSchema = z4.infer<typeof createPositionZodSchema>