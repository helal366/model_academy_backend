import { StatusCodes } from "http-status-codes";
import { AppError } from "../../helperFunctions/globalError/globalErrorHelperFunction";
import { prisma } from "../../lib/prisma";
import { TCreatePositionZodSchema } from "./position.zod.validation";

const createPosition = async (payload: TCreatePositionZodSchema) => {
  const { position_name, role_name } = payload;

  const existingPosition = await prisma.userPosition.findUnique({
    where: { position_name },
    select: { id: true },
  });
  if (existingPosition) {
    throw new AppError(
      `Your provided position : ${position_name} already exists.`,
      StatusCodes.CONFLICT,
    );
  }

  const existingRole = await prisma.userRole.findUnique({
    where: { role_name },
    select: { id: true },
  });
  if (!existingRole) {
    throw new AppError(
      `Your provided role : ${role_name} does not exist.`,
      StatusCodes.NOT_FOUND,
    );
  }

  const createdNewPosition = await prisma.userPosition.create({
    data: {
      position_name,
      role: {
        connect: { id: existingRole.id },
      },
    },
  });

  return createdNewPosition;
};

export const positionServices = {
  createPosition,
};
