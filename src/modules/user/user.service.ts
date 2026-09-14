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

  // check role validity
  const roleExists = await findRoleExistance(role_name);
  if (!roleExists) {
    throw new AppError(
      `Provided Role: ${role_name} is not a valid role.`,
      StatusCodes.NOT_FOUND,
    );
  }

  // check that the position belongs to the requested role
  const positionExists = await checkRolePositionPair({
    role_name,
    position_name,
  });

  // check user existance
  const userExist = await userHelperFunction.userExistance({
    role_name,
    full_name,
    mobile_number,
  });
  if (userExist) {
    throw new AppError(
      `User already exists with Name: ${full_name}, Mobile number: ${mobile_number} and Role: ${role_name}`,
      StatusCodes.CONFLICT,
    );
  }

  // create user name
  const userCount = await userHelperFunction.userCount({
    role_name,
    mobile_number,
  });
  let user_name = mobile_number;
  if (userCount !== 0) {
    user_name = `${mobile_number}-${userCount + 1}`;
  }

  // create user and management staff
  const user = await prisma.user.create({
    data: {
      full_name,
      mobile_number,
      email,
      ...rest,
      role: {
        connect: { role_name },
      },
      position: {
        connect: { id: positionExists.id },
      },
      management_staff_profile: {
        create: {
          full_name,
          mobile_number,
          email,
          user_name,
          current_position: {
            connect: { id: positionExists.id },
          },
          current_role: {
            connect: { id: roleExists.id },
          },
        },
      },
    },
  });
  return payload;
};
export const userServices = {
  createUser,
};
