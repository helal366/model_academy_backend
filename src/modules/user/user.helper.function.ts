import { prisma } from "../../lib/prisma";
import { IExistancePayload, IUserCount } from "./user.interface";

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

const userCount = async({role, mobile_number}:IUserCount)=>{
    let userCount=0;
    if(role==="SUPER_ADMIN" || role ==="TEACHER_ADMIN" || role ==="ADMIN" || role === "MANAGEMENT"){
        userCount = await prisma.managementStaff.count({
            where:{
                mobile_number
            }
        })
    }else if(role === "STUDENT"){

    }else if(role === "GOVERNING_BODY"){

    }else if(role === "TEACHER" || role === "ACADEMIC"){

    }
    return userCount
}
export const userHelperFunction = {
    userExistance,
    userCount
}