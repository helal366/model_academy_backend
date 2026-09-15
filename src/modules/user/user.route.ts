import { Router } from "express";
import { userController } from "./user.controller.js";
import { validateZodSchema } from "../../middlewares/validate.zod.schema.js";
import { userCreateZodSchema } from "./user.zod.validation.js";

const router = Router();
router.post(
  "/create_user",
  validateZodSchema(userCreateZodSchema),
  userController.createuser,
);
export const userRouter: Router = router;
