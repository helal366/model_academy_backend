import { StatusCodes } from "http-status-codes"
import { AppError } from "../../helperFunctions/globalError/globalErrorHelperFunction"

const userExistance = async(role: string)=>{
    let user=""
    if(role==="SUPER_ADMIN" || role ==="TEACHER_ADMIN" || role ==="ADMIN" || role === "MANAGEMENT"){

    }else if(role === "STUDENT"){

    }else if(role === "GOVERNING_BODY"){

    }else if(role === "TEACHER" || role === "ACADEMIC"){

    }
}

export const userHelperFunction = {
    userExistance
}