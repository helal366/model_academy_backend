import { StatusCodes } from "http-status-codes";
import { AppError } from "../../helperFunctions/globalError/globalErrorHelperFunction";
import { userHelperFunction } from "./user.helper.function";
import { TUserCreatePayload } from "./user.zod.validation"

const createUser=async(payload: TUserCreatePayload)=>{
    const {role, full_name, mobile_number} = payload ;
    const userExist = await userHelperFunction.userExistance({role, full_name, mobile_number});
    if(userExist){
        throw new AppError(`User already exists with Name: ${full_name}, Mobile number: ${mobile_number} and Role: ${role}`, StatusCodes.CONFLICT)
    }
    const userCount = await userHelperFunction.userCount({role, mobile_number});
    let user_name = mobile_number
    if(userCount !== 0){
        user_name = `${mobile_number}_${userCount}`
    }
    return payload
}
export const userServices={
    createUser
}