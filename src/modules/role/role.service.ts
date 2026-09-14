import { StatusCodes } from "http-status-codes";
import { AppError } from "../../helperFunctions/globalError/globalErrorHelperFunction";
import { prisma } from "../../lib/prisma";
import { TCreateRoleZodSchema } from "./role.zod.validation";

const createRole = async(payload: TCreateRoleZodSchema)=>{
    const {role_name} = payload
    const checkExistance = await prisma.userRole.findUnique({
        where: {role_name},
        select:{id:true}
    });
    if(checkExistance){
        throw new AppError(`Your provided role : ${role_name} already exixts.`, StatusCodes.CONFLICT)
    };

    const createdNewRole = await prisma.userRole.create({
        data: {
            role_name
        }
    })
    return createdNewRole
};

export const roleServices={
    createRole
}