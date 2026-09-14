import { StatusCodes } from "http-status-codes"
import { AppError } from "../../helperFunctions/globalError/globalErrorHelperFunction"
import { UserWhereInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

interface IExistancePayload{
    role: string;
    full_name: string;
    mobile_number: string;
}

const userExistance = async({role, full_name, mobile_number}:IExistancePayload)=>{
    let user=null;
    if(role==="SUPER_ADMIN" || role ==="TEACHER_ADMIN" || role ==="ADMIN" || role === "MANAGEMENT"){
        user = await prisma.managementStaff.findUnique({
            where:{
                management_full_name_mobile_unique:{
                    full_name, mobile_number
                }
            }
        })
    }else if(role === "STUDENT"){

    }else if(role === "GOVERNING_BODY"){

    }else if(role === "TEACHER" || role === "ACADEMIC"){

    }
    return user
}

export const userHelperFunction = {
    userExistance
}