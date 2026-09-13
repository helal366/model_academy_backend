import { userHelperFunction } from "./user.helper.function";
import { TUserCreatePayload } from "./user.zod.validation"

const createUser=async(payload: TUserCreatePayload)=>{
    const {role} = payload ;
    const userExist=await userHelperFunction.userExistance(role)
}
export const userServices={
    createUser
}