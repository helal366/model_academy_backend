import { TCreatePositionZodSchema } from "./position.zod.validation"

const createPosition=async(payload:TCreatePositionZodSchema)=>{
    return payload
}

export const positionServices={
    createPosition
}