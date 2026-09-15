import { StatusCodes } from "http-status-codes";
import { AppError } from "../../helperFunctions/globalError/globalErrorHelperFunction";
import { userHelperFunction } from "./user.helper.function";
import { TUserCreatePayload } from "./user.zod.validation";
import { findRoleExistance } from "../../helperFunctions/cachedData/cache_roles";
import { checkRolePositionPair } from "../../helperFunctions/cachedData/cache_positions";
import { prisma } from "../../lib/prisma";

const createUser = async (payload: TUserCreatePayload) => {
  const { full_name, mobile_number, email, position_name, role_name, ...rest } =
    payload;

  // make role and position to upper case
  const cleanRole = role_name.trim().toUpperCase();
  const cleanPosition = position_name.trim().toUpperCase();

  // check role validity
  const roleExists = await findRoleExistance(cleanRole);
  if (!roleExists) {
    throw new AppError(
      `Provided Role: ${cleanRole} is not a valid role.`,
      StatusCodes.NOT_FOUND,
    );
  }

  // check that the position belongs to the requested role
  const positionExists = await checkRolePositionPair({
    role_name: cleanRole,
    position_name: cleanPosition,
  });

  // check user existance
  const userExist = await userHelperFunction.userExistance({
    role_name: cleanRole,
    full_name,
    mobile_number,
  });
  if (userExist) {
    throw new AppError(
      `User already exists with Name: ${full_name}, Mobile number: ${mobile_number} and Role: ${cleanRole}`,
      StatusCodes.CONFLICT,
    );
  }

  // create user name
  const userCount = await userHelperFunction.userCount({
    role_name: cleanRole,
    mobile_number,
  });
  let user_name = mobile_number;
  if (userCount !== 0) {
    user_name = `${mobile_number}-${userCount + 1}`;
  }

  // create user and management staff
  const newUser = await prisma.user.create({
    data: {
      full_name,
      mobile_number,
      email,
      ...rest,
      user_name,
      role: {
        connect: { role_name: cleanRole },
      },
      position: {
        connect: { id: positionExists.id },
      },
      management_staff_profile: {
        create: {
          full_name,
          mobile_number,
          email,
          current_position: {
            connect: { id: positionExists.id },    //connection require unique constraints
          },
          current_role: {
            connect: { id: roleExists.id },     //connection require unique constraints
          },
        },
      },
    },
  });
  return newUser;
};
export const userServices = {
  createUser,
};
